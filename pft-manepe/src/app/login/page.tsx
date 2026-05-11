"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Evita redirección automática para manejar errores localmente
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
    } else {
      router.push("/home");
      router.refresh();
    }
  };

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center mt-5">
        <form 
          onSubmit={handleSubmit}
          className="bg-black border border-white p-6 space-y-4 flex flex-col w-80"
        >
          <h2 className="text-xl font-bold">Iniciar Sesión</h2>
          
          {error && (
            <p className="bg-red-500 text-white p-2 text-sm">{error}</p>
          )}

          <div>
            <p>Correo electrónico</p>
            <input
              name="email"
              type="email"
              required
              className="bg-white border border-black text-black w-full px-2"
            />
          </div>

          <div>
            <p>Contraseña</p>
            <input
              name="password"
              type="password"
              required
              className="bg-white border border-black text-black w-full px-2"
            />
          </div>

          <Button seleccionado type="submit">
            Entrar
          </Button>

          <a href="/signup" className="underline text-sm text-center">
            ¿No tienes cuenta? Regístrate
          </a>
        </form>
      </div>
    </>
  );
}