"use client";

import Fondo from "@/components/ui/fondoEstrellado";
import Buscador from "@/components/ui/buscador";

export default function Page() {
  return (
    <>
      <Fondo />
      <div className="flex h-[96vh] py-5 px-4 gap-4">


        <div className="flex flex-col gap-4 w-1/2">


          <div className="bg-black border border-white p-6 flex-1 flex flex-col space-y-3">
            <h1 className="starFont text-xl font-semibold">Backtest</h1>
            <p className="text-sm text-gray-300">
              Diseña tu estrategia cuantitativa, define reglas de entrada y
              salida, y simula su comportamiento histórico sobre cualquier activo.
            </p>
            <a
              href="/backtest"
              className="inline-block text-sm border border-white px-4 py-1 mt-auto hover:bg-white hover:text-black transition-colors w-fit"
            >
              Ir al Backtest →
            </a>
          </div>


          <div className="bg-black border border-white p-6 flex-1 flex flex-col space-y-3">
            <h1 className="starFont text-xl font-semibold">Screener</h1>
            <p className="text-sm text-gray-300">
              Filtra el universo de activos según criterios técnicos y
              fundamentales para encontrar las mejores oportunidades de mercado.
            </p>
            <a
              href="/screener"
              className="inline-block text-sm border border-white px-4 py-1 mt-auto hover:bg-white hover:text-black transition-colors w-fit"
            >
              Ir al Screener →
            </a>
          </div>

        </div>


        <div className="w-1/2 flex flex-col">
          <div className="bg-black border border-white p-6 flex-1 flex flex-col">
            <h1 className="starFont text-xl font-semibold mb-4">
              Buscador de Tickers
            </h1>
            <div className="flex-1 overflow-hidden">
              <Buscador />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}