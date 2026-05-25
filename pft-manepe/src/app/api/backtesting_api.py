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
        # Forzar a que la curva neta sea una Serie unidimensional
        if isinstance(curva_neta, pd.DataFrame):
            curva_neta = curva_neta.iloc[:, 0]

        curva_benchmark = sp500_data * (request.capital_inicial / sp500_data.iloc[0])
        if isinstance(curva_benchmark, pd.DataFrame):
            curva_benchmark = curva_benchmark.iloc[:, 0]

        trades = pf.trades
        total_trades = len(trades.records)
        
        win_rate = trades.win_rate() if total_trades > 0 else 0.0
        profit_factor = trades.profit_factor() if total_trades > 0 else 0.0

        beneficio_absoluto = pf.total_profit()
        retorno_porcentaje = pf.total_return() * 100
        retorno_anualizado = pf.annualized_return() * 100
        max_dd = pf.max_drawdown() * 100
        sharpe = pf.sharpe_ratio()

        def as_scalar(val):
            if isinstance(val, (pd.Series, pd.DataFrame)):
                return val.iloc[0] if not val.empty else 0.0
            return val

        return {
            "estado": "exito",
            "resultados_netos": {
                "beneficio_neto_absoluto": round(float(as_scalar(beneficio_absoluto)), 2),
                "retorno_neto_porcentaje": round(float(as_scalar(retorno_porcentaje)), 2),
                "retorno_neto_anualizado": round(float(as_scalar(retorno_anualizado)), 2),
                "maximo_drawdown": round(float(as_scalar(max_dd)), 2),
                "ratio_sharpe": round(float(as_scalar(sharpe)), 2),
                "factor_beneficio": round(float(as_scalar(profit_factor)), 2),
                "tasa_acierto_neta": round(float(as_scalar(win_rate) * 100 if total_trades > 0 else 0.0), 2),
                "numero_operaciones": int(total_trades)
            },
            "grafica": {
                "fechas": curva_neta.index.strftime('%Y-%m-%d').tolist(),
                "estrategia_neto": [round(float(v), 2) for v in curva_neta.values],
                "sp500_neto": [round(float(v), 2) for v in curva_benchmark.values]
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))