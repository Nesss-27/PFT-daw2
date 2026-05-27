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

  const handleRegister = async () => {
    setError("");
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser(formData);

      const res = await signIn("credentials", {
        email: formData.get("email"),
        password,
        redirect: false,
      });

      if (res?.ok) router.push("/home");

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <Fondo />
      <div className="flex flex-col justify-center items-center h-screen">
        <form ref={formRef} className="bg-black border border-white p-2 space-y-1 flex flex-col">
          <h2 className="text-xl">Crear Cuenta</h2>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <div className="w-100 flex flex-row mt-3 justify-between gap-4">
            <div className="w-full">
              <p>Nombre</p>
              <input name="name" type="text"
                className="bg-white border border-black text-black w-full p-1" />
            </div>
            <div className="w-full">
              <p>Apellidos</p>
              <input name="apellido" type="text"
                className="bg-white border border-black text-black w-full p-1" />
            </div>
          </div>

          <p>Correo electrónico</p>
          <input name="email" type="email"
            className="bg-white border border-black text-black p-1" />

          <p>Contraseña</p>
          <input name="password" type="password"
            className="bg-white border border-black text-black p-1" />

          <p>Confirmar contraseña</p>
          <input name="confirm" type="password"
            className="bg-white border border-black text-black p-1" />

          <Button seleccionado onClick={handleRegister}>
            Crear cuenta
          </Button>

          <a href="/login" className="underline text-sm">
            ¿Ya tienes cuenta? Inicia sesión
          </a>
        </form>
      </div>
    </>
  );
}