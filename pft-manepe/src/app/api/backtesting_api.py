from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import yfinance as yf
import vectorbt as vbt
import pandas as pd
import warnings

warnings.filterwarnings("ignore")

app = FastAPI(title="API Backtesting - Universo de Acciones")

class Regla(BaseModel):
    indicador1: str
    param1: int
    operador: str
    indicador2: str
    param2: float

class BacktestRequest(BaseModel):
    tickers: List[str]
    start_date: str
    capital_inicial: float = 10000.0
    condiciones_compra: List[Regla]
    condiciones_venta: List[Regla]

def evaluar_indicador(df, indicador: str, param: float):
    if indicador == 'PRICE': return df
    if indicador == 'VALUE': return param
    if indicador == 'RSI': return vbt.RSI.run(df, window=int(param)).rsi
    if indicador == 'SMA': return vbt.MA.run(df, window=int(param)).ma
    if indicador == 'EMA': return vbt.MA.run(df, window=int(param), ewm=True).ma
    if indicador == 'MACD_LINE': return vbt.MACD.run(df).macd
    if indicador == 'MACD_SIGNAL': return vbt.MACD.run(df).signal
    raise ValueError(f"Indicador {indicador} no reconocido")

def construir_matriz_senales(df, reglas: List[Regla]):
    if not reglas:
        return pd.DataFrame(False, index=df.index, columns=df.columns)
    resultado_final = pd.DataFrame(True, index=df.index, columns=df.columns)
    for regla in reglas:
        serie1 = evaluar_indicador(df, regla.indicador1, regla.param1)
        serie2 = evaluar_indicador(df, regla.indicador2, regla.param2)
        if isinstance(serie2, pd.DataFrame):
            serie2 = serie2.values
        if isinstance(serie1, pd.DataFrame):
            serie1 = serie1.values
        if regla.operador == '>':
            condicion = serie1 > serie2
        elif regla.operador == '<':
            condicion = serie1 < serie2
        else:
            raise ValueError("Operador no soportado. Usa '>' o '<'")
        condicion = pd.DataFrame(condicion, index=df.index, columns=df.columns)
        resultado_final = resultado_final & condicion
    return resultado_final

@app.post("/run-backtest")
def run_backtest(request: BacktestRequest):
    try:
        data = yf.download(request.tickers, start=request.start_date, progress=False)[['Close']]
        if len(request.tickers) == 1:
            data.columns = request.tickers
        else:
            data.columns = data.columns.droplevel(0)

        sp500_data = yf.download("^GSPC", start=request.start_date, progress=False)['Close']

        entradas = construir_matriz_senales(data, request.condiciones_compra)
        salidas = construir_matriz_senales(data, request.condiciones_venta)

        pf = vbt.Portfolio.from_signals(
            data, entradas, salidas,
            init_cash=request.capital_inicial,
            cash_sharing=True, group_by=True,
            freq='D'
        )

        curva_neta = pf.value()
        curva_benchmark = sp500_data * (request.capital_inicial / sp500_data.iloc[0])

        trades = pf.trades
        win_rate = trades.win_rate() if len(trades.records) > 0 else 0.0
        profit_factor = pf.trades.profit_factor() if len(trades.records) > 0 else 0.0

        return {
            "estado": "exito",
            "resultados_netos": {
                "beneficio_neto_absoluto": round(float(pf.total_profit()), 2),
                "retorno_neto_porcentaje": round(float(pf.total_return() * 100), 2),
                "retorno_neto_anualizado": round(float(pf.annualized_return() * 100), 2),
                "maximo_drawdown": round(float(pf.max_drawdown() * 100), 2),
                "ratio_sharpe": round(float(pf.sharpe_ratio()), 2),
                "factor_beneficio": round(float(profit_factor), 2),
                "tasa_acierto_neta": round(float(win_rate * 100), 2),
                "numero_operaciones": int(len(trades.records))
            },
            "grafica": {
                "fechas": curva_neta.index.strftime('%Y-%m-%d').tolist(),
                "estrategia_neto": [round(float(v), 2) for v in curva_neta.values],
                "sp500_neto": [round(float(v), 2) for v in curva_benchmark.values]
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
