"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Regla {
  indicador1: string;
  param1: number;
  operador: string;
  indicador2: string;
  param2: number;
}

const indicadoresDisponibles = [
  "PRICE",
  "VALUE",
  "SMA",
  "EMA",
  "RSI",
  "MACD_LINE",
  "MACD_SIGNAL",
];

const selectClass =
  "bg-black border border-white text-white px-2 py-1 text-sm focus:outline-none";
const inputClass =
  "bg-white border border-black text-black px-2 py-1 text-sm w-full focus:outline-none";
const labelClass = "text-sm text-gray-300 mb-1 block";

interface FilaReglaProps {
  regla: Regla;
  idx: number;
  tipo: "compra" | "venta";
  condicionesCompra: Regla[];
  condicionesVenta: Regla[];
  manejarCambioRegla: (tipo: "compra" | "venta", index: number, campo: keyof Regla, valor: any) => void;
  eliminarRegla: (tipo: "compra" | "venta", index: number) => void;
}

const FilaRegla = ({
  regla,
  idx,
  tipo,
  condicionesCompra,
  condicionesVenta,
  manejarCambioRegla,
  eliminarRegla,
}: FilaReglaProps) => (
  <div className="flex flex-row gap-2 items-center mb-2 flex-wrap">
    <select
      value={regla.indicador1}
      onChange={(e) => manejarCambioRegla(tipo, idx, "indicador1", e.target.value)}
      className={selectClass}
    >
      {indicadoresDisponibles.map((i) => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
    <input
      type="number"
      placeholder="Param 1"
      value={regla.param1}
      onChange={(e) => manejarCambioRegla(tipo, idx, "param1", Number(e.target.value))}
      className="bg-white border border-black text-black px-2 py-1 text-sm w-20 focus:outline-none"
    />
    <select
      value={regla.operador}
      onChange={(e) => manejarCambioRegla(tipo, idx, "operador", e.target.value)}
      className={selectClass}
    >
      <option value=">">&gt;</option>
      <option value="<">&lt;</option>
    </select>
    <select
      value={regla.indicador2}
      onChange={(e) => manejarCambioRegla(tipo, idx, "indicador2", e.target.value)}
      className={selectClass}
    >
      {indicadoresDisponibles.map((i) => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
    <input
      type="number"
      step="any"
      placeholder="Param 2"
      value={regla.param2}
      onChange={(e) => manejarCambioRegla(tipo, idx, "param2", Number(e.target.value))}
      className="bg-white border border-black text-black px-2 py-1 text-sm w-20 focus:outline-none"
    />
    {(tipo === "compra" ? condicionesCompra : condicionesVenta).length > 1 && (
      <button
        type="button"
        onClick={() => eliminarRegla(tipo, idx)}
        className="bg-red-600 text-white border border-red-400 px-3 py-1 text-sm hover:bg-red-700"
      >
        X
      </button>
    )}
  </div>
);

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

export default function BacktestDashboard() {
  const [loading, setLoading] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [resultados, setResultados] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [tickers, setTickers] = useState("AAPL, MSFT");
  const [startDate, setStartDate] = useState("2023-01-01");
  const [capitalInicial, setCapitalInicial] = useState(15000);

  const [condicionesCompra, setCondicionesCompra] = useState<Regla[]>([
    { indicador1: "SMA", param1: 21, operador: ">", indicador2: "SMA", param2: 50 },
  ]);
  const [condicionesVenta, setCondicionesVenta] = useState<Regla[]>([
    { indicador1: "SMA", param1: 21, operador: "<", indicador2: "SMA", param2: 50 },
  ]);

  useEffect(() => {
    const saved = urlToPayload(window.location.search);
    if (!saved) return;
    if (saved.tickers)            setTickers(saved.tickers.join(", "));
    if (saved.start_date)         setStartDate(saved.start_date);
    if (saved.capital_inicial)    setCapitalInicial(saved.capital_inicial);
    if (saved.condiciones_compra) setCondicionesCompra(saved.condiciones_compra);
    if (saved.condiciones_venta)  setCondicionesVenta(saved.condiciones_venta);
  }, []);

  const manejarCambioRegla = (
    tipo: "compra" | "venta",
    index: number,
    campo: keyof Regla,
    valor: any
  ) => {
    const lista = tipo === "compra" ? [...condicionesCompra] : [...condicionesVenta];
    lista[index] = { ...lista[index], [campo]: valor };
    tipo === "compra" ? setCondicionesCompra(lista) : setCondicionesVenta(lista);
  };

  const agregarRegla = (tipo: "compra" | "venta") => {
    const nuevaRegla: Regla = {
      indicador1: "SMA",
      param1: 14,
      operador: ">",
      indicador2: "VALUE",
      param2: 50,
    };
    tipo === "compra"
      ? setCondicionesCompra([...condicionesCompra, nuevaRegla])
      : setCondicionesVenta([...condicionesVenta, nuevaRegla]);
  };

  const eliminarRegla = (tipo: "compra" | "venta", index: number) => {
    tipo === "compra"
      ? setCondicionesCompra(condicionesCompra.filter((_, i) => i !== index))
      : setCondicionesVenta(condicionesVenta.filter((_, i) => i !== index));
  };

  // Construye el payload para serializar (sin los .map de Number, eso es solo para el fetch)
  const buildSharePayload = (listaTickers: string[]) => ({
    tickers: listaTickers,
    start_date: startDate,
    capital_inicial: Number(capitalInicial),
    condiciones_compra: condicionesCompra,
    condiciones_venta: condicionesVenta,
  });

  const copiarLink = () => {
    const listaTickers = tickers
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter(Boolean);
    const url = payloadToUrl(buildSharePayload(listaTickers));
    window.history.pushState(null, "", url);

    // navigator.clipboard solo funciona en HTTPS o localhost
    // fallback con execCommand para HTTP
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url);
    } else {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity  = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ejecutarBacktest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const listaTickers = tickers
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter((t) => t !== "");

    // Actualiza la URL automáticamente al ejecutar
    const url = payloadToUrl(buildSharePayload(listaTickers));
    window.history.pushState(null, "", url);

    const payload = {
      tickers: listaTickers,
      start_date: startDate,
      capital_inicial: Number(capitalInicial),
      condiciones_compra: condicionesCompra.map((r) => ({
        ...r,
        param1: Number(r.param1),
        param2: Number(r.param2),
      })),
      condiciones_venta: condicionesVenta.map((r) => ({
        ...r,
        param1: Number(r.param1),
        param2: Number(r.param2),
      })),
    };

    try {
      const res = await fetch("/api/backtest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(payload);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResultados(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = resultados
    ? {
        labels: resultados.grafica.fechas,
        datasets: [
          {
            label: "Estrategia",
            data: resultados.grafica.estrategia_neto,
            borderColor: "#C016DD",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            tension: 0.1,
            pointRadius: 0,
          },
          {
            label: "S&P 500",
            data: resultados.grafica.sp500_neto,
            borderColor: "#6B7280",
            backgroundColor: "rgba(107, 114, 128, 0.1)",
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      }
    : null;

  return (
    <>
      <Fondo />
      <div className="flex flex-col items-center min-h-screen py-5 px-4 text-white">
        <form onSubmit={ejecutarBacktest} className="bg-black border border-white p-6 w-full max-w-4xl space-y-4">
          <h2 className="text-xl font-semibold">Screener Quant Avanzado</h2>

          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <p className={labelClass}>Tickers (separados por coma)</p>
              <input
                type="text"
                value={tickers}
                onChange={(e) => setTickers(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <p className={labelClass}>Fecha de Inicio</p>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div className="flex-1 min-w-[140px]">
              <p className={labelClass}>Capital Inicial ($)</p>
              <input
                type="number"
                value={capitalInicial}
                onChange={(e) => setCapitalInicial(Number(e.target.value))}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <p className="text-green-400 font-semibold mb-2">Condiciones de Compra (AND)</p>
            {condicionesCompra.map((regla, idx) => (
              <FilaRegla
                key={`compra-${idx}`}
                regla={regla}
                idx={idx}
                tipo="compra"
                condicionesCompra={condicionesCompra}
                condicionesVenta={condicionesVenta}
                manejarCambioRegla={manejarCambioRegla}
                eliminarRegla={eliminarRegla}
              />
            ))}
            <button
              type="button"
              onClick={() => agregarRegla("compra")}
              className="text-sm text-gray-300 border border-gray-600 px-3 py-1 mt-1 hover:border-white"
            >
              + Añadir Regla de Compra
            </button>
          </div>

          <div>
            <p className="text-red-400 font-semibold mb-2">Condiciones de Venta (AND)</p>
            {condicionesVenta.map((regla, idx) => (
              <FilaRegla
                key={`venta-${idx}`}
                regla={regla}
                idx={idx}
                tipo="venta"
                condicionesCompra={condicionesCompra}
                condicionesVenta={condicionesVenta}
                manejarCambioRegla={manejarCambioRegla}
                eliminarRegla={eliminarRegla}
              />
            ))}
            <button
              type="button"
              onClick={() => agregarRegla("venta")}
              className="text-sm text-gray-300 border border-gray-600 px-3 py-1 mt-1 hover:border-white"
            >
              + Añadir Regla de Venta
            </button>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <Button className="bg-black border border-r-white border-b-white border-white p-4 m-1 text-white" seleccionado>
              {loading ? "Calculando simulación cuantitativa..." : "Ejecutar Backtest"}
            </Button>

            <button
              type="button"
              type="submit"
              onClick={copiarLink}
              className="text-sm text-gray-300 border border-gray-600 px-3 py-1 hover:border-white transition-colors"
            >
              {copied ? "✓ Link copiado" : "Guardar link"}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm font-semibold">Error: {error}</p>
          )}
        </form>

        {resultados && chartData && (
          <div className="w-full max-w-4xl mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Retorno %",
                  value: `${resultados.resultados_netos.retorno_neto_porcentaje}%`,
                  color: "text-white",
                },
                {
                  label: "Max Drawdown",
                  value: `${resultados.resultados_netos.maximo_drawdown}%`,
                  color: "text-red-400",
                },
                {
                  label: "Ratio Sharpe",
                  value: resultados.resultados_netos.ratio_sharpe,
                  color: "text-white",
                },
                {
                  label: "Operaciones",
                  value: resultados.resultados_netos.numero_operaciones,
                  color: "text-white",
                },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-black border border-white p-4 space-y-1">
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-black border border-white p-4">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { labels: { color: "#fff" } },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { color: "#9CA3AF" },
                    },
                    y: {
                      grid: { color: "rgba(255,255,255,0.05)" },
                      ticks: { color: "#9CA3AF" },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
