import { NextResponse } from "next/server";
import { getCurrentUser, clearAuthCookie } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    clearAuthCookie();
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}

