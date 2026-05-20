'use client';
import Fondo from "@/components/ui/fondoEstrellado"

export default function Page() {


    return (
        <>
        <Fondo/>
        <div className="bg-gray-800 w-full h-screen grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <div className="col-span-1 bg-pink-3  00"></div>
            <div className="col-span-2 bg-pink-500"></div>
                        <div className="col-span-1 bg-pink-700"></div>
            <div className="col-span-1 bg-pink-900"></div>
        </div>
        </>
    );
}
