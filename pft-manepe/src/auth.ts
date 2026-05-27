import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  //adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }

        const user = await prisma.usuarios.findUnique({
          where: { correo: email }
        })
        if (!user || !user.contrasena) return null

        const ok = await bcrypt.compare(password, user.contrasena)
        if (!ok) return null

        return {
          id: user.id_user,
          name: user.nombre,
          email: user.correo,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
})