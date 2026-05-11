"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registrarUsuario(formData: FormData) {
  const nombre = formData.get("nombre") as string
  const correo = formData.get("correo") as string
  const password = formData.get("password") as string

  // Validar que no exista el usuario
  const existe = await prisma.user.findUnique({ where: { correo } })
  if (existe) return { error: "El correo ya existe" }

  const hashed = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      nombre,
      correo,
      contrasena: hashed
    }
  })

  redirect("/home") // O al login para que entre
}