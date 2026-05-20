"use client";
import Fondo from "@/components/ui/fondoEstrellado";

export default function Page() {
  return (
    <>
      <Fondo />
      <div className="bg-gray-800 w-full h-[95vh] grid grid-cols-3 gap-3 p-2">
        <div className="col-span-2 bg-pink-300 rounded-xl">
          <h1>Backtest</h1>
          <h2>
            Es el vecino el que elige al alcalde y es el alcalde el que quiere
            que sean los vecinos el alcalde. Los españoles son muy españoles y
            mucho españoles.
          </h2>
          <a href="#">BOTON</a>
        </div>
        <div className="col-span-1 row-span-2 bg-pink-500 rounded-xl p-2 overflow-y-auto 
            [scrollbar-width:thin] 
            [scrollbar-color:#ff007f_#20232a]
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-[#20232a]
            [&::-webkit-scrollbar-track]:rounded-md
            [&::-webkit-scrollbar-thumb]:bg-[#ff007f]
            [&::-webkit-scrollbar-thumb]:rounded-md
            hover:[&::-webkit-scrollbar-thumb]:bg-[#e60072]">
          <h1>Tutorial</h1>
          <h2>
            A veces la mejor decisión es no tomar ninguna decisión, y eso es
            también una decisión. La cerámica de Talavera no es cosa menor,
            dicho de otra manera, es cosa mayor. Viva el vino. España es una
            gran nación y los españoles muy españoles y mucho españoles.
            Exportar es positivo porque vendes lo que produces a uno que está
            fuera de tu país."Dije que bajaría los impuestos y los estoy
            subiendo. No he cambiado de criterio, es que han cambiado las
            circunstancias." La lluvia es un fenómeno que se produce cuando las
            nubes se cargan de agua y ésta cae. Es el alcalde el que quiere que
            sean los vecinos el alcalde. Un vaso es un vaso y un plato es un
            plato. Por las carreteras van coches y por los aeropuertos aviones.
            España es un gran país que tiene españoles.
          </h2>
          <a href="#">BOTON</a>
        </div>
        <div className="col-span-2 bg-pink-700 rounded-xl p-2">
          <h1>Backtest</h1>
          <h2>
            Es el vecino el que elige al alcalde y es el alcalde el que quiere
            que sean los vecinos el alcalde. Los españoles son muy españoles y
            mucho españoles.
          </h2>
          <a href="#">BOTON</a>
        </div>
      </div>
    </>
  );
}
