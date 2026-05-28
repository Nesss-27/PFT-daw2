'use client';
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="h-10 w-full px-10  flex justify-between items-center bg-black border-0 border-b-1 border-white sticky">
      <a href="/">
      <img src="/logo.svg" alt="Logo" className="h-8" />
</a>
      {/* Botón hamburguesa */}
      <button onClick={() => setOpen(!open)} className="flex flex-col gap-1 cursor-pointer">
        <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-10 right-0 bg-black border border-white flex flex-col z-50 min-w-32">
          <a href="/home" className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm">Home</a>
          <a href="/backtest" className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm">Backtest</a>
          <a href="/screener" className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm">Screener</a>
          <a href="/donate" className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm">Donar</a>
          
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: `/login` })}
              className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm text-left border-t border-white"
            >
              Salir
            </button>
          ) : (
            <a href="/login" className="px-6 py-3 hover:bg-white hover:text-black transition-colors text-sm border-t border-white">
              Iniciar sesión
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;