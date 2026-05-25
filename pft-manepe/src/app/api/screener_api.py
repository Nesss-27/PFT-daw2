from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import yfinance as yf
import vectorbt as vbt
import pandas as pd
import warnings

warnings.filterwarnings("ignore")

app = FastAPI(title="API Screener de Acciones")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# ESQUEMAS
# ==========================================
class Regla(BaseModel):
    indicador1: str  # 'RSI', 'SMA', 'EMA', 'MACD_LINE', 'MACD_SIGNAL', 'PRICE'
    param1: int      # ej: 14 para RSI, 50 para SMA (poner 0 si es PRICE)
    operador: str    # '>' o '<'
    indicador2: str  # 'VALUE', 'SMA', 'EMA', 'PRICE'
    param2: float    # ej: 30 (valor estático) o 200 (otra media)

class ScreenerRequest(BaseModel):
    tickers: List[str]
    start_date: str
    condiciones: List[Regla]

# ==========================================
# MOTOR DE INDICADORES
# ==========================================
def evaluar_indicador(df, indicador: str, param: float):
    if indicador == "PRICE": return df
    if indicador == "VALUE": return param
    if indicador == "RSI": return vbt.RSI.run(df, window=int(param)).rsi
    if indicador == "SMA": return vbt.MA.run(df, window=int(param)).ma
    if indicador == "EMA": return vbt.MA.run(df, window=int(param), ewm=True).ma
    if indicador == "MACD_LINE": return vbt.MACD.run(df).macd
    if indicador == "MACD_SIGNAL": return vbt.MACD.run(df).signal
    raise ValueError(f"Indicador '{indicador}' no reconocido")

def obtener_ultimo_valor(serie):
    if isinstance(serie, pd.DataFrame):
        return float(serie.iloc[:, 0].dropna().iloc[-1])
    elif isinstance(serie, pd.Series):
        return float(serie.dropna().iloc[-1])
    else:
        return float(serie)

def ticker_cumple_condiciones(df_ticker, condiciones):
    for regla in condiciones:
        serie1 = evaluar_indicador(df_ticker, regla.indicador1, regla.param1)
        serie2 = evaluar_indicador(df_ticker, regla.indicador2, regla.param2)
        v1 = obtener_ultimo_valor(serie1)
        v2 = obtener_ultimo_valor(serie2)
        if regla.operador == ">" and not (v1 > v2):
            return False
        if regla.operador == "<" and not (v1 < v2):
            return False
    return True

def calcular_metricas(ticker, df_ticker):
    precio_actual = float(df_ticker.iloc[-1, 0])

    def cambio(n):
        if len(df_ticker) >= n:
            return round((precio_actual / float(df_ticker.iloc[-n, 0]) - 1) * 100, 2)
        return None

    rsi = sma50 = sma200 = None
    try:
        rsi = round(float(vbt.RSI.run(df_ticker, window=14).rsi.dropna().iloc[-1, 0]), 2)
    except: pass
    try:
        sma50 = round(float(vbt.MA.run(df_ticker, window=50).ma.dropna().iloc[-1, 0]), 2)
    except: pass
    try:
        sma200 = round(float(vbt.MA.run(df_ticker, window=200).ma.dropna().iloc[-1, 0]), 2)
    except: pass

    return {
        "ticker": ticker,
        "precio_actual": round(precio_actual, 2),
        "cambio_1m_%": cambio(21),
        "cambio_3m_%": cambio(63),
        "cambio_1y_%": cambio(252),
        "rsi_14": rsi,
        "sma_50": sma50,
        "sma_200": sma200,
    }

# ==========================================
# ENDPOINT PRINCIPAL
# ==========================================
@app.post("/screener")
def screener(request: ScreenerRequest):
    try:
        data = yf.download(request.tickers, start=request.start_date, progress=False)[["Close"]]
        if len(request.tickers) == 1:
            data.columns = request.tickers
        else:
            data.columns = data.columns.droplevel(0)

        aprobados = []
        rechazados = []

        for ticker in request.tickers:
            try:
                df_ticker = data[[ticker]].dropna()
                if df_ticker.empty:
                    rechazados.append({"ticker": ticker, "motivo": "Sin datos"})
                    continue

                if ticker_cumple_condiciones(df_ticker, request.condiciones):
                    aprobados.append(calcular_metricas(ticker, df_ticker))
                else:
                    rechazados.append({"ticker": ticker, "motivo": "No cumple los filtros"})

            except Exception as e:
                rechazados.append({"ticker": ticker, "motivo": str(e)})

        return {
            "estado": "exito",
            "total_analizados": len(request.tickers),
            "total_aprobados": len(aprobados),
            "aprobados": aprobados,
            "rechazados": rechazados
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ==========================================
# ARRANQUE LOCAL
# ==========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("screener_api:app", host="0.0.0.0", port=8001, reload=True)
