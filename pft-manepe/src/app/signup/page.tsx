"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { registerUser } from "../actions/register";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function SignupPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name     = formData.get("name") as string;
    const apellido = formData.get("apellido") as string;
    const email    = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm  = formData.get("confirm") as string;

    // Validaciones
    if (!name.trim()) {
      setError("Introduce tu nombre");
      return;
    }
    if (!apellido.trim()) {
      setError("Introduce tus apellidos");
      return;
    }
    if (!email.trim()) {
      setError("Introduce tu correo electrónico");
      return;
    }
    if (!email.includes("@")) {
      setError("El correo no es válido");
      return;
    }
    if (!password) {
      setError("Introduce una contraseña");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await registerUser(formData);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/home");
      } else {
        setError("Cuenta creada pero no se pudo iniciar sesión. Intenta hacer login.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center h-screen">
        <form ref={formRef} className="bg-black border border-white p-4 space-y-1 flex flex-col w-80">
          <h2 className="text-xl">Crear Cuenta</h2>

          {error && (
            <p className="text-red-500 text-xs border border-red-500 p-2">
              {error}
            </p>
          )}

          <div className="flex flex-row mt-2 justify-between gap-4">
            <div className="w-full">
              <p className="text-sm">Nombre</p>
              <input name="name" type="text"
                placeholder="Juan"
                className="bg-white border border-black text-black w-full p-1 text-sm" />
            </div>
            <div className="w-full">
              <p className="text-sm">Apellidos</p>
              <input name="apellido" type="text"
                placeholder="García"
                className="bg-white border border-black text-black w-full p-1 text-sm" />
            </div>
          </div>

          <p className="text-sm">Correo electrónico</p>
          <input name="email" type="email"
            placeholder="tu@correo.com"
            className="bg-white border border-black text-black p-1 text-sm" />

          <p className="text-sm">Contraseña</p>
          <input name="password" type="password"
            placeholder="Mínimo 6 caracteres"
            className="bg-white border border-black text-black p-1 text-sm" />

          <p className="text-sm">Confirmar contraseña</p>
          <input name="confirm" type="password"
            placeholder="••••••••"
            className="bg-white border border-black text-black p-1 text-sm" />

          <Button seleccionado onClick={handleRegister} disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>

          <a href="/login" className="underline text-sm">
            ¿Ya tienes cuenta? Inicia sesión
          </a>
        </form>
      </div>
    </>
  );
}