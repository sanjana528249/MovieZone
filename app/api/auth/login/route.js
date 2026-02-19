import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { signToken, setAuthCookie, clearAuthCookie } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing credentials" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      clearAuthCookie();
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      clearAuthCookie();
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken(user);
    setAuthCookie(token);

    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

