"use server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const name      = formData.get("name") as string
  const apellido  = formData.get("apellido") as string
  const email     = formData.get("email") as string
  const password  = formData.get("password") as string

  const existe = await prisma.usuarios.findUnique({ where: { correo: email } })
  if (existe) throw new Error("El correo ya está registrado")

  const hash = await bcrypt.hash(password, 10)

  await prisma.usuarios.create({
    data: {
      nombre: `${name} ${apellido}`,
      correo: email,
      contrasena: hash,
    },
  })
}