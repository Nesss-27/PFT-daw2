'use client'
import { useRouter } from 'next/navigation'
import Button from '@/components/buttom'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async () => {
    const esValido = await verificarCredenciales() // tu lógica aquí
    //TODO Cambiar el login//
    function verificarCredenciales() {
        return true
    }
    //// 



    if (esValido) {
      router.push('/home') // ← aquí, justo después de confirmar
    }
  }

  return (
    <Button id="" seleccionado onClick={() => handleLogin()}>Entrar</Button>
  )
}