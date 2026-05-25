"use client";

import { useState, useEffect, useRef, useMemo } from "react";

interface Ticker {
  t: string;
  n: string;
  m: string;
}

const TRENDING: Ticker[] = [
  { t: "NVDA", n: "NVIDIA Corporation", m: "NASDAQ" },
  { t: "SAN.MC", n: "Banco Santander, S.A.", m: "BME" },
  { t: "REP.MC", n: "Repsol, S.A.", m: "BME" },
  { t: "TEF.MC", n: "Telefónica, S.A.", m: "BME" },
  { t: "AIR.MC", n: "Airbus SE", m: "BME" },
  { t: "AAPL", n: "Apple Inc.", m: "NASDAQ" },
  { t: "TSLA", n: "Tesla, Inc.", m: "NASDAQ" },
  { t: "MSFT", n: "Microsoft Corporation", m: "NASDAQ" },
];

const MARKET_COLORS: Record<string, string> = {
  NASDAQ: "text-secondary-light",
  NYSE: "text-yellow-400",
  BME: "text-primary-light",
};

interface Props {
  onSelect?: (ticker: Ticker) => void;
}

export default function Buscador({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [allTickers, setAllTickers] = useState<Ticker[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [cartera, setCartera] = useState<Ticker[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/tickers.json")
      .then((r) => r.json())
      .then((data: Ticker[]) => {
        setAllTickers(data);
        setLoadingList(false);
      })
      .catch(() => setLoadingList(false));
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toUpperCase();
    const bySymbol = allTickers.filter((t) => t.t.toUpperCase().startsWith(q));
    const byName = allTickers.filter(
      (t) =>
        !t.t.toUpperCase().startsWith(q) && t.n.toUpperCase().startsWith(q)
    );
    return [...bySymbol, ...byName].slice(0, 50);
  }, [query, allTickers]);

  const handleSelect = (ticker: Ticker) => {
    setCartera((prev) =>
      prev.find((t) => t.t === ticker.t) ? prev : [...prev, ticker]
    );
    setQuery("");
    onSelect?.(ticker);
    inputRef.current?.focus();
  };

  const removeFromCartera = (sym: string) => {
    setCartera((prev) => prev.filter((t) => t.t !== sym));
  };

  const showDropdown = query.trim().length > 0;

 return (
    <div className="bg-black border border-white w-full flex flex-col">
      {/* Search input */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-700">
        <svg
          className="w-4 h-4 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loadingList ? "Cargando tickers..." : "Buscar empresas"}
          disabled={loadingList}
          className="bg-transparent text-white text-sm placeholder-gray-500 outline-none w-full"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-gray-500 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div className="max-h-64 overflow-y-auto border-b border-gray-700 [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-[20px] [&::-webkit-scrollbar-thumb]:border-3 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-black">
          {filtered.length === 0 ? (
            <p className="text-gray-500 text-xs px-4 py-3 italic">
              Sin resultados para "{query}"
            </p>
          ) : (
            filtered.map((ticker) => (
              <button
                key={ticker.t}
                onClick={() => handleSelect(ticker)}
                className="w-full text-left px-4 py-2 hover:bg-gray-900 transition-colors border-b border-gray-800 last:border-0"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-semibold">
                    {ticker.t}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      MARKET_COLORS[ticker.m] ?? "text-gray-400"
                    }`}
                  >
                    {ticker.m}
                  </span>
                </div>
                <p className="text-gray-400 text-xs truncate">{ticker.n}</p>
              </button>
            ))
          )}
        </div>
      )}

      {/* Trending */}
      {!showDropdown && (
        <>
          <div className="px-4 pt-3 pb-1">
            <p className="text-white font-semibold text-sm">Trending Tickers</p>
          </div>
          <div className="flex flex-col">
            {TRENDING.map((ticker, i) => (
              <button
                key={ticker.t}
                onClick={() => handleSelect(ticker)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-900 transition-colors border-b border-gray-800 last:border-0 ${
                  i === 0 ? "bg-gray-900 hover:bg-gray-800" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-semibold">
                    {ticker.t}
                  </span>
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-xs">Acción</span>
                    <span
                      className={`text-xs font-medium ${
                        MARKET_COLORS[ticker.m] ?? "text-gray-400"
                      }`}
                    >
                      {ticker.m}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-xs truncate">{ticker.n}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Cartera */}
      <div className="border-t border-gray-700 mt-auto">
        <p className="text-gray-400 text-xs text-center py-2">
          tu cartera de valores
        </p>
        {cartera.length === 0 ? (
          <p className="text-gray-600 text-xs text-center pb-3 italic">vacía</p>
        ) : (
          <div className="flex flex-col max-h-32 overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-thumb]:rounded-[20px] [&::-webkit-scrollbar-thumb]:border-3 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-black">
            {cartera.map((ticker) => (
              <div
                key={ticker.t}
                className="flex justify-between items-center px-4 py-1 hover:bg-gray-900"
              >
                <div>
                  <span className="text-white text-sm font-semibold">
                    {ticker.t}
                  </span>
                  <span className="text-gray-500 text-xs ml-2 truncate max-w-[120px] inline-block align-middle">
                    {ticker.n}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCartera(ticker.t)}
                  className="text-gray-600 hover:text-red-400 text-xs ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}