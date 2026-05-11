"use client";

import { useState } from "react";
import { registrarUsuario } from "@/lib/actions";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Envolvemos la Server Action para manejar el estado y evitar el error de TS
  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);

    try {
      const result = await registrarUsuario(formData);
      
      // Si la acción devuelve un error (ej: correo duplicado)
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center mt-5">
        <form 
          action={handleSubmit} 
          className="bg-black border border-white p-4 space-y-3 w-[400px]"
        >
          <h2 className="text-xl font-bold text-white">Crear Cuenta</h2>
          
          {/* Mostrar error si existe */}
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-2 text-xs">
              {error}
            </div>
          )}

          <div className="flex flex-row justify-between gap-4">
            <div className="w-full">
              <p className="text-sm text-gray-300">Nombre</p>
              <input
                name="nombre"
                type="text"
                required
                disabled={loading}
                className="bg-white border border-black text-black w-full p-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-300">Apellidos</p>
              <input
                name="apellidos"
                type="text"
                disabled={loading}
                className="bg-white border border-black text-black w-full p-1 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-300">Correo electrónico</p>
            <input
              name="correo"
              type="email"
              required
              disabled={loading}
              className="bg-white border border-black text-black w-full p-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <p className="text-sm text-gray-300">Contraseña</p>
            <input
              name="password"
              type="password"
              required
              disabled={loading}
              className="bg-white border border-black text-black w-full p-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <p className="text-sm text-gray-300">Confirmar contraseña</p>
            <input
              name="confirmPassword"
              type="password"
              required
              disabled={loading}
              className="bg-white border border-black text-black w-full p-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="pt-2">
            <Button seleccionado type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Crear cuenta"}
            </Button>
          </div>

          <div className="text-center pt-2">
            <a href="/signup" className="underline text-sm text-gray-400 hover:text-white transition-colors">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </>
  );
}