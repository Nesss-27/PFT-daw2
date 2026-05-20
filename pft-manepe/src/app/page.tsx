'use client';


import Navbar from "@/components/ui/navbar";
import Fondo from "@/components/ui/fondoEstrellado"
import Hero from "@/components/ui/hero"
import Terminal from "@/components/ui/terminal";
import Carac from "@/components/ui/caracteristicas";
import Equipo from "@/components/ui/equipo";

export default function Page() {

    return (
        <>
            <Fondo/>
            <Hero/>
            <Carac/>
            <Equipo/>

        </>
    )
}