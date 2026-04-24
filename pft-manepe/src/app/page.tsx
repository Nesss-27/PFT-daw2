'use client';

import Footer from "@/components/ui/footer/footer";
import Navbar from "@/components/ui/navbar/navbar";
import Fondo from "../components/ui/fondoEstrellado/fondoEstrellado"
import Hero from "@/components/ui/hero/hero"

export default function Page() {

    return (
        <>
            <Fondo></Fondo>
            <Navbar></Navbar>
            <Hero></Hero>
            <Footer></Footer>
        </>
    )
}