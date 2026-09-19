import { NextRequest, NextResponse } from "next/server";
import client from "@/app/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookiestore = await cookies();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { msg: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable is not defined");
    }
    const user = await client.user.findFirst({
      where: { email: email.trim().toLowerCase() },
    });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return NextResponse.json(
          { msg: "Invalid credentials. Please verify your password." },
          { status: 401 }
        );
      }
      const role = (user.role || "CANDIDATE") as string;
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: role,
          canPostJob: user.canPostJob ?? false,
          canDeleteJob: user.canDeleteJob ?? false,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      cookiestore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
      const { password: _, ...safeUser } = user;
      const redirectTo =
        role === "ADMIN"
          ? "/admin"
          : role === "RECRUITER"
            ? "/recruiter/dashboard"
            : "/user/dashboard";

      return NextResponse.json(
        {
          success: true,
          user: safeUser,
          role,
          token,
          redirectTo,
        },
        { status: 200 }
      );
    }
    const admin = await client.admin.findFirst({
      where: { email: email.trim().toLowerCase() },
    });

    if (admin) {
      const isValidAdmin = await bcrypt.compare(password, admin.password);
      if (!isValidAdmin) {
        return NextResponse.json(
          { msg: "Invalid credentials." },
          { status: 401 }
        );
      }
      const token = jwt.sign(
        {
          id: admin.id,
          email: admin.email,
          role: "ADMIN",
          canDeleteJob: admin.canDeleteJob ?? false,
          canPostJob: admin.canPostJob ?? false,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      cookiestore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });

      const { password: _, ...safeAdmin } = admin;
      return NextResponse.json(
        {
          success: true,
          user: safeAdmin,
          role: "ADMIN",
          token,
          redirectTo: "/admin",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { msg: "No verified account identified with this email." },
      { status: 401 }
    );
  } catch (err: any) {
    console.error("Unified login error:", err);
    return NextResponse.json(
      { msg: err.message || "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
