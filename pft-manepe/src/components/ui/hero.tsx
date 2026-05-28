"use client";
function Hero() {



  return (
    <div className="text-center h-[calc(100vh-2.5rem)] w-3/4 mx-auto flex flex-col justify-center items-center gap-y-10 ">
      <h1 className="starFont text-9xl">Manepe</h1>
      <h2 className="starFont text-xl ">
        Screener y Backtesting de <b className="text-primary">Código Abierto</b>
        <br/>
        Potencia profesional para inversores de todos los niveles
      </h2>
      <a
        className="text-white starFont py-2 px-4 rounded-full border
        hover:bg-white hover:text-black "
        href="/login"
      >
        Entrar
      </a>
    </div>
  );
}

export default Hero;
