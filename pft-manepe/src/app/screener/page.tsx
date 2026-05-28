"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

interface Regla {
  indicador1: string;
  param1: number;
  operador: string;
  indicador2: string;
  param2: number;
}

interface MetricasTicker {
  ticker: string;
  precio_actual: number;
  "cambio_1m_%": number | null;
  "cambio_3m_%": number | null;
  "cambio_1y_%": number | null;
  rsi_14: number | null;
  sma_50: number | null;
  sma_200: number | null;
}

interface Rechazado {
  ticker: string;
  motivo: string;
}

interface ScreenerResponse {
  estado: string;
  total_analizados: number;
  total_aprobados: number;
  aprobados: MetricasTicker[];
  rechazados: Rechazado[];
}

const selectClass =
  "bg-black border border-white text-white px-2 py-1 text-sm focus:outline-none";
const inputClass =
  "bg-white border border-black text-black px-2 py-1 text-sm w-full focus:outline-none";
const labelClass = "text-sm text-gray-300 mb-1 block";

// Serialización / deserialización del payload en la URL
function payloadToUrl(payload: any): string {
  const json = JSON.stringify(payload);
  const b64  = btoa(unescape(encodeURIComponent(json)));
  const url  = new URL(window.location.href);
  url.searchParams.set("config", b64);
  return url.toString();
}

function urlToPayload(search: string) {
  const raw = new URLSearchParams(search).get("config");
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(escape(atob(raw))));
  } catch {
    return null;
  }
}

export default function ScreenerDashboard() {
  const [tickersInput, setTickersInput] = useState<string>("AAPL, MSFT, GOOGL, AMZN");
  const [startDate, setStartDate] = useState<string>("2025-01-01");
  const [condiciones, setCondiciones] = useState<Regla[]>([
    { indicador1: "RSI", param1: 14, operador: "<", indicador2: "VALUE", param2: 30 },
  ]);
  const [resultado, setResultado] = useState<ScreenerResponse | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Leer config desde la URL al montar el componente
  useEffect(() => {
    const saved = urlToPayload(window.location.search);
    if (!saved) return;
    if (saved.tickers)    setTickersInput(saved.tickers.join(", "));
    if (saved.start_date) setStartDate(saved.start_date);
    if (saved.condiciones) setCondiciones(saved.condiciones);
  }, []);

  const copiarLink = () => {
    const listaTickers = tickersInput
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);
    const payload = {
      tickers: listaTickers,
      start_date: startDate,
      condiciones,
    };
    const url = payloadToUrl(payload);
    window.history.pushState(null, "", url);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const agregarRegla = () => {
    setCondiciones([
      ...condiciones,
      { indicador1: "PRICE", param1: 0, operador: ">", indicador2: "SMA", param2: 50 },
    ]);
  };

  const eliminarRegla = (index: number) => {
    setCondiciones(condiciones.filter((_, i) => i !== index));
  };

  const modificarRegla = (index: number, campo: keyof Regla, valor: any) => {
    const nuevasReglas = [...condiciones];
    nuevasReglas[index] = { ...nuevasReglas[index], [campo]: valor };
    setCondiciones(nuevasReglas);
  };

  const ejecutarScreener = async () => {
    setCargando(true);
    setError(null);
    setResultado(null);

    const listaTickers = tickersInput
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter((t) => t.length > 0);

    if (listaTickers.length === 0) {
      setError("Introduce al menos un ticker.");
      setCargando(false);
      return;
    }

    // Actualiza la URL automáticamente al ejecutar
    const url = payloadToUrl({
      tickers: listaTickers,
      start_date: startDate,
      condiciones,
    });
    window.history.pushState(null, "", url);

    try {
      const response = await fetch("/api/screener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tickers: listaTickers,
          start_date: startDate,
          condiciones: condiciones.map((r) => ({
            ...r,
            param1: Number(r.param1),
            param2: Number(r.param2),
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detalle || "Error al procesar el screener.");
      setResultado(data);
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const colorCambio = (val: number | null) =>
    val === null ? "text-gray-400" : val >= 0 ? "text-green-400" : "text-red-400";

  return (
    <>
      <Fondo />
      <div className="flex flex-col items-center min-h-screen py-10 px-4">
        <div className="bg-black border border-white p-6 w-full max-w-4xl space-y-4">
          <h2 className="text-xl font-semibold">Screener de Acciones</h2>

          {/* Configuración General */}
          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <p className={labelClass}>Tickers (separados por coma)</p>
              <input
                type="text"
                value={tickersInput}
                onChange={(e) => setTickersInput(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="min-w-[140px]">
              <p className={labelClass}>Fecha de Inicio</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Condiciones Técnicas */}
          <div>
            <p className="text-white font-semibold mb-2">Condiciones Técnicas</p>
            {condiciones.map((regla, index) => (
              <div key={index} className="flex flex-row gap-2 items-center mb-2 flex-wrap">
                <select
                  value={regla.indicador1}
                  onChange={(e) => modificarRegla(index, "indicador1", e.target.value)}
                  className={selectClass}
                >
                  {["PRICE", "RSI", "SMA", "EMA", "MACD_LINE", "MACD_SIGNAL"].map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Param 1"
                  value={regla.param1}
                  onChange={(e) => modificarRegla(index, "param1", e.target.value)}
                  disabled={["PRICE", "MACD_LINE", "MACD_SIGNAL"].includes(regla.indicador1)}
                  className="bg-white border border-black text-black px-2 py-1 text-sm w-20 focus:outline-none disabled:opacity-40"
                />
                <select
                  value={regla.operador}
                  onChange={(e) => modificarRegla(index, "operador", e.target.value)}
                  className={selectClass}
                >
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                </select>
                <select
                  value={regla.indicador2}
                  onChange={(e) => modificarRegla(index, "indicador2", e.target.value)}
                  className={selectClass}
                >
                  {["VALUE", "PRICE", "SMA", "EMA"].map((i) => (
                    <option key={i} value={i}>{i === "VALUE" ? "VALUE (Estático)" : i}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="any"
                  placeholder="Param 2 / Valor"
                  value={regla.param2}
                  onChange={(e) => modificarRegla(index, "param2", e.target.value)}
                  disabled={regla.indicador2 === "PRICE"}
                  className="bg-white border border-black text-black px-2 py-1 text-sm w-24 focus:outline-none disabled:opacity-40"
                />
                <button
                  type="button"
                  onClick={() => eliminarRegla(index)}
                  className="bg-red-600 text-white border border-red-400 px-3 py-1 text-sm hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={agregarRegla}
              className="text-sm text-gray-300 border border-gray-600 px-3 py-1 mt-1 hover:border-white"
            >
              + Añadir Condición
            </button>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <Button id="" seleccionado onClick={ejecutarScreener}>
              {cargando ? "Ejecutando Análisis..." : "Escanear Mercado"}
            </Button>

            <button
              type="button"
              onClick={copiarLink}
              className="text-sm text-gray-300 border border-gray-600 px-3 py-1 hover:border-white transition-colors"
            >
              {copied ? "✓ Link copiado" : "Guardar link"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-semibold">Error: {error}</p>
          )}
        </div>

        {/* Resultados */}
        {resultado && (
          <div className="w-full max-w-4xl mt-6 space-y-4">
            <div className="bg-black border border-white p-4 flex gap-6">
              <p className="text-sm text-gray-400">
                Analizados: <span className="text-white font-bold">{resultado.total_analizados}</span>
              </p>
              <p className="text-sm text-gray-400">
                Aprobados: <span className="text-green-400 font-bold">{resultado.total_aprobados}</span>
              </p>
            </div>

            {/* Tabla Aprobados */}
            <div className="bg-black border border-white overflow-x-auto">
              <p className="text-white font-semibold px-4 pt-4 pb-2">
                Activos que cumplen los filtros
              </p>
              {resultado.aprobados.length > 0 ? (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white text-gray-400 text-left">
                      {["Ticker", "Precio", "Var. 1M", "Var. 3M", "Var. 1Y", "RSI (14)", "SMA 50", "SMA 200"].map(
                        (h) => (
                          <th key={h} className="px-4 py-2 font-medium whitespace-nowrap">
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.aprobados.map((item) => (
                      <tr
                        key={item.ticker}
                        className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                      >
                        <td className="px-4 py-2 font-bold text-white">{item.ticker}</td>
                        <td className="px-4 py-2 text-gray-200">${item.precio_actual}</td>
                        <td className={`px-4 py-2 ${colorCambio(item["cambio_1m_%"])}`}>
                          {item["cambio_1m_%"] !== null ? `${item["cambio_1m_%"]}%` : "-"}
                        </td>
                        <td className={`px-4 py-2 ${colorCambio(item["cambio_3m_%"])}`}>
                          {item["cambio_3m_%"] !== null ? `${item["cambio_3m_%"]}%` : "-"}
                        </td>
                        <td className={`px-4 py-2 ${colorCambio(item["cambio_1y_%"])}`}>
                          {item["cambio_1y_%"] !== null ? `${item["cambio_1y_%"]}%` : "-"}
                        </td>
                        <td className="px-4 py-2 text-gray-200">{item.rsi_14 ?? "-"}</td>
                        <td className="px-4 py-2 text-gray-200">
                          {item.sma_50 !== null ? `$${item.sma_50}` : "-"}
                        </td>
                        <td className="px-4 py-2 text-gray-200">
                          {item.sma_200 !== null ? `$${item.sma_200}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-sm italic px-4 pb-4">
                  Ningún activo cumplió con los criterios especificados.
                </p>
              )}
            </div>

            {/* Rechazados */}
            {resultado.rechazados.length > 0 && (
              <div className="bg-black border border-white p-4 space-y-1">
                <p className="text-white font-semibold mb-2">Excluidos / Errores</p>
                {resultado.rechazados.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-400">
                    <span className="text-gray-200 font-semibold">{item.ticker}</span>: {item.motivo}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}