import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isProtected = req.nextUrl.pathname.startsWith("/home") ||
    req.nextUrl.pathname.startsWith("/screener") ||
    req.nextUrl.pathname.startsWith("/backtest")

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: ["/home/:path*", "/screener/:path*", "/backtest/:path*"],
}