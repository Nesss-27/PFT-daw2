'use client';
import { useState, ReactNode } from "react";
import Menu from "@/components/ui/menu";
import Button from "@/components/buttom";
import Bactest from "@/components/backtest/grafico";

export default function Page() {
    const [menuPrincipal, setMenuPrincipal] = useState<string | null>(null);
    const [subMenu, setSubMenu] = useState<string | null>(null);

    const BotonPrincipal = ({ id, children }: { id: string; children: ReactNode }) => (
        <Button
            id={id}
            seleccionado={menuPrincipal === id}
            onClick={() => { setMenuPrincipal(id); setSubMenu(null); }}
        >
            {children}
        </Button>
    );

    const BotonSub = ({ id, children }: { id: string; children: ReactNode }) => (
        <Button
            id={id}
            seleccionado={subMenu === id}
            onClick={() => setSubMenu(id)}
        >
            {children}
        </Button>
    );

    return (
        <>
            <Menu titulo="Menu" xmen={1} ymen={1}>
                <BotonPrincipal id="btn-1">Usuario</BotonPrincipal>
                <BotonPrincipal id="btn-2">Backtest</BotonPrincipal>
                <BotonPrincipal id="btn-3">Screener</BotonPrincipal>
                <BotonPrincipal id="btn-4">Salir</BotonPrincipal>
            </Menu>

            {menuPrincipal === "btn-1" && (
                <Menu xmen={165} ymen={1} titulo="Usuario">
                    <BotonSub id="btn-5">Ajustes</BotonSub>
                </Menu>
            )}
        </>
    );
}