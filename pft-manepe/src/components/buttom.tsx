'use client';
import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-block rounded transition-all duration-300", 
  {
    variants: {
      variant: {
        default: "relative inline-block mt-1 w-full py-[5px] text-center bg-[#aaa] border border-black border-t-[#fff] border-l-[#fff] border-b-[#000] border-r-[#000] text-[16px] leading-none font-sans text-black text-left",
        second: "relative inline-block mt-1 w-full py-[5px] text-center bg-[#ddd] border border-black border-t-[#fff] border-l-[#fff] border-b-[#000] border-r-[#000] text-[16px] leading-none font-sans text-black text-left",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Extendemos de ButtonHTMLAttributes para heredar 'type', 'disabled', etc.
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string; // Lo hacemos opcional si no siempre lo usas
  seleccionado: boolean;
  children?: React.ReactNode;
}

export default function Button({ 
  id, 
  seleccionado, 
  children, 
  onClick, 
  type = "button", // Valor por defecto
  className,
  ...props 
}: ButtonProps) {
  const variant = seleccionado ? "second" : "default";

  return (
    <button 
      id={id}
      type={type}
      className={buttonVariants({ variant }) + ` ${className || ""}`} 
      onClick={onClick}
      {...props} // Pasa el resto de atributos nativos al elemento <button>
    >
      {children}
    </button>
  );
}