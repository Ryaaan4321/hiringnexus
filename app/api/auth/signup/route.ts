import { NextRequest, NextResponse } from "next/server";
import client from "@/app/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookiestore = await cookies();
    const body = await req.json();
    const {
      name,
      username,
      email,
      password,
      phonenumber,
      role = "CANDIDATE",
      companyName,
      companyWebsite,
    } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { msg: "Full name, email address, and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = (username || email.split("@")[0] || "user")
      .trim()
      .toLowerCase();
    const existingUser = await client.user.findFirst({
      where: { email: cleanEmail },
    });
    const existingAdmin = await client.admin.findFirst({
      where: { email: cleanEmail },
    });
    if (existingUser || existingAdmin) {
      return NextResponse.json(
        { msg: "An account with this email address already exists. Please sign in." },
        { status: 400 }
      );
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable is not defined");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const assignedRole = role === "RECRUITER" ? "RECRUITER" : "CANDIDATE";

    const newUser = await client.user.create({
      data: {
        name: name.trim(),
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        phonenumber: phonenumber ? phonenumber.trim() : "",
        role: assignedRole,
        companyName: assignedRole === "RECRUITER" ? companyName?.trim() : undefined,
        companyWebsite: assignedRole === "RECRUITER" ? companyWebsite?.trim() : undefined,
        canPostJob: assignedRole === "RECRUITER",
      },
    });
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: assignedRole,
        canPostJob: newUser.canPostJob ?? false,
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

    const { password: _, ...safeUser } = newUser;
    const redirectTo =
      assignedRole === "RECRUITER" ? "/recruiter/dashboard" : "/user/dashboard";
    return NextResponse.json(
      {
        success: true,
        user: safeUser,
        role: assignedRole,
        token,
        redirectTo,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Unified signup error:", err);
    return NextResponse.json(
      { msg: err.message || "Failed to create verified coordinates." },
      { status: 500 }
    );
  }
}
