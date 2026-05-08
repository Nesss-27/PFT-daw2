"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/buttom";
import Fondo from "@/components/ui/fondoEstrellado";

export default function signuppage() {
  const router = useRouter();

  const handleLogin = async () => {
    const esValido = await verificarCredenciales();
    //TODO Cambiar el login//
    function verificarCredenciales() {
      return true;
    }
    ////

    if (esValido) {
      router.push("/home");
    }
  };

 return (
      <>
        <Fondo />
     <div className="flex flex-col justify-center items-center  mt-5">
       <div className="bg-black border border-white p-2 space-y-1">
         <h2 className="">Iniciar Sesion</h2>
         
         <p>Correo electronico</p>
         <input
           type="email"
           className="bg-white border border-black text-black"
         />
         <p>Contraseña</p>
         <input
           type="password"
           className="bg-white border border-black text-black"
         />
        
         <Button id="" seleccionado onClick={() => handleLogin()}>
           Iniciar sesion
         </Button>
         <a href="/login" className="underline ">Ya tienes cuenta ?</a>
       </div>
     </div>
     </>
   );
}
