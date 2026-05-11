"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registrarUsuario(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const correo = formData.get("correo") as string
  const password = formData.get("password") as string

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      nombre,
      correo,
      contrasena: hashed
    }
  })
}