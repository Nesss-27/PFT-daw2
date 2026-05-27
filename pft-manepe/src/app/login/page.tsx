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
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    // Validaciones
    if (!email && !password) {
      setError("Introduce tu correo y contraseña");
      return;
    }
    if (!email) {
      setError("Introduce tu correo electrónico");
      return;
    }
    if (!email.includes("@")) {
      setError("El correo no es válido");
      return;
    }
    if (!password) {
      setError("Introduce tu contraseña");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

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
        <div className="bg-black border border-white p-4 space-y-2 flex flex-col w-80">
          <h2 className="text-xl">Iniciar Sesión</h2>

          {error && (
            <p className="text-red-500 text-xs border border-red-500 p-2">
              {error}
            </p>
          )}

          <p className="text-sm">Correo electrónico</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="tu@correo.com"
            className="bg-white border border-black text-black p-1 text-sm"
          />

          <p className="text-sm">Contraseña</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="••••••••"
            className="bg-white border border-black text-black p-1 text-sm"
          />

          <Button seleccionado onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </Button>

          <a href="/signup" className="underline text-sm">
            ¿No tienes cuenta? Crea una
          </a>
        </div>
      </div>
    </>
  );
}