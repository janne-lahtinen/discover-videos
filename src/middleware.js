import { NextResponse } from "next/server"
import { verifyToken } from "../lib/utils"

export async function middleware(req, ev) {
  const token = req ? req.cookies.get("token") : null
  const userId = await verifyToken(token)
  const pathName = req.nextUrl.pathname
  console.log({userId, pathName});

  if (token && userId || pathName.includes('/api/login')) {
    return NextResponse.next()
  }

  if (!token && pathName !== '/login') {
    console.log('redirected');
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/', '/browse/:path*'],
}