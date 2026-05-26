import { NextResponse } from "next/server";

const FASTAPI_SCREENER_URL = process.env.NEXT_PUBLIC_SCREENER_API_URL || "http://127.0.0.1:8002";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${FASTAPI_SCREENER_URL}/screener`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

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
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json(
      { 
        estado: "error", 
        detalle: error.message || "Error interno en el servidor de Next.js" 
      },
      { status: 500 }
    );
  }
}