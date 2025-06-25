import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ msg: "logged out!" });
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("next-auth.csrf-token");
    res.cookies.delete("next-auth.callback-url");
    res.cookies.delete("next-auth.state");
    res.cookies.delete("access_token");
    return res;
}