"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/home");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-black border border-white p-2 space-y-2 flex flex-col">
          <h2 className="text-xl">Iniciar Sesión</h2>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <p>Correo electrónico</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border border-black text-black p-1"
          />

          <p>Contraseña</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border border-black text-black p-1"
          />

          <Button seleccionado onClick={handleLogin}>
            Iniciar sesión
          </Button>

          <a href="/signup" className="underline text-sm">
            ¿No tienes cuenta? Crea una
          </a>
        </div>
      </div>
    </>
  );
}