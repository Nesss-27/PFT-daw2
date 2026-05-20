"use client";

import Script from "next/script";
import { useRef, useState } from "react";
import Fondo from "@/components/ui/fondoEstrellado";

export default function Donate() {
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);

  const initPayPalButton = () => {
    setSdkReady(true);

    if (!buttonContainerRef.current) return;

    buttonContainerRef.current.innerHTML = "";

    (window as any).PayPal.Donation.Button({
      env: "production",
      hosted_button_id: "AWDBWMAMJN72G",
      image: {
        src: "https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif",
        alt: "Botón Donar con PayPal",
        title: "PayPal - The safer, easier way to pay online!",
      },
    }).render("#donate-button");
  };

  return (
    <>
      <Fondo />
      <div className="flex items-center h-screen">
        <div
          className="
      w-9/10
  border-1 border-white
 m-auto
 mt-55
 p-5
  flex flex-col gap-5
  bg-black
"
        >
          <h1 className="starFont text-xl">Donar a Manepe</h1>
          <h2 >
            Manepe es un programa de licencia libre y se ofrece de forma
            gratuita. Su donación, que es completamente opcional, ayuda a
            sostener nuestra comunidad en todo el mundo. Si le gusta el
            programa, le invitamos a considerar una donación.
          </h2>

          <div id="donate-button-container" className="m-auto">
            {!sdkReady && <p>Cargando botón de donación...</p>}
            <div ref={buttonContainerRef} id="donate-button" />
          </div>

          <Script
            src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
            strategy="afterInteractive"
            onLoad={initPayPalButton}
          />
        </div>
      </div>
    </>
  );
}
