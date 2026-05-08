"use client";

import { useRouter } from "next/navigation";
import Terminal from "./terminal";
import { Span } from "next/dist/trace";

function Hero() {
  const router = useRouter();

  const handleLogin = async () => {
    const esValido = await verificarCredenciales();
    //TODO Cambiar el login//
    function verificarCredenciales() {
      return true;
    }
    ////

    if (esValido) {
      router.push("/login");
    }
  };

  return (
    <div className="text-center mt-10 h-[calc(100vh-2.5rem)] w-3/4 mx-auto ">
      <h1 className="starFont text-9xl mt-45">Titulo</h1>
      <h2 className="starFont text-xl mt-15">
        Screener y Backtesting de <b className="text-primary">Código Abierto</b>
        <br/>
        Potencia profesional para inversores de todos los niveles
      </h2>
      <button
        className="text-white starFont py-2 px-4 rounded-full border mt-15
        hover:bg-white hover:text-black "
        onClick={() => handleLogin()}
      >
        Entrar
      </button>
    </div>
  );
}

export default Hero;
