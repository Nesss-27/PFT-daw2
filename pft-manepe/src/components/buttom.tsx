'use client';
import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";



const buttonVariants = cva(
  "inline-block rounded transition-all duration-300", 
  {
    variants: {
      variant: {
        default: "relative inline-block w-full py-[5px] text-center bg-[#aaa] border border-black border-t-[#fff] border-l-[#fff] border-b-[#000] border-r-[#000] text-[16px] leading-none font-sans text-black text-left",
        second: "relative inline-block w-full py-[5px] text-center bg-[#ddd] border border-black border-t-[#fff] border-l-[#fff] border-b-[#000] border-r-[#000] text-[16px] leading-none font-sans text-black text-left",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Extracción automática de tipos desde las variantes
interface ButtonProps {
  id: string;
  seleccionado: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ id, seleccionado, children, onClick }: ButtonProps) {
  const variant = seleccionado ? "second" : "default";

  return (
    <button 
      className={buttonVariants({ variant })} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}