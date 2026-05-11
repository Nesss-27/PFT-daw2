"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Importante para la autenticación
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function signuppage() {
  const router = useRouter();
  
  // Estados para capturar los datos del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Limpiar errores previos

    // Llamada a Auth.js
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // Evita recarga de página para manejar el error nosotros
    });

    if (result?.error) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/home");
    }
  };

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="bg-black border border-white p-2 space-y-2 flex flex-col">
          <h2 className="text-xl">Iniciar Sesion</h2>
          
          {error && <p className="text-red-500 text-xs">{error}</p>}
          
          <p>Correo electronico</p>
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
            Iniciar sesion
          </Button>

          <a href="/login" className="underline text-sm">
            ¿No tienes cuenta? Crea una
          </a>
        </div>
      </div>
    </>
  );
}