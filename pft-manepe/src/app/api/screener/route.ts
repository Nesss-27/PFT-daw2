import { NextResponse } from "next/server";

// URL del backend de FastAPI (Screener)
const FASTAPI_SCREENER_URL = process.env.NEXT_PUBLIC_SCREENER_API_URL || "http://127.0.0.1:8002";

export async function POST(request: Request) {
  try {
    // 1. Obtener el cuerpo de la petición enviado desde el frontend de Next.js
    const body = await request.json();

    // 2. Reenviar la petición al backend de FastAPI
    const response = await fetch(`${FASTAPI_SCREENER_URL}/screener`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // 3. Verificar si el backend respondió con un error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          estado: "error", 
          detalle: errorData.detail || "Error en el servidor de análisis (FastAPI)" 
        },
        { status: response.status }
      );
    }

    // 4. Retornar los datos procesados por el Screener al cliente
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    // Manejo de fallos de conexión o errores de parseo
    return NextResponse.json(
      { 
        estado: "error", 
        detalle: error.message || "Error interno en el servidor de Next.js" 
      },
      { status: 500 }
    );
  }
}