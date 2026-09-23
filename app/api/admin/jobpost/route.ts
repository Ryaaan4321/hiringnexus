import { NextRequest, NextResponse } from "next/server";
import client from "@/app/db";
import { jwtVerify, JWTPayload } from "jose";

interface AuthTokenPayload extends JWTPayload {
  id?: string;
  email?: string;
  role?: string;
  canPostJob?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    const token = req.cookies.get("token")?.value || bearerToken;

    if (!token) {
      return NextResponse.json(
        { msg: "Authentication token is missing. Please log in." },
        { status: 401 }
      );
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable is not defined");
    }

    let payload: AuthTokenPayload;
    try {
      const verified = await jwtVerify<AuthTokenPayload>(
        token,
        new TextEncoder().encode(process.env.SECRET_KEY)
      );
      payload = verified.payload;
    } catch {
      return NextResponse.json(
        { msg: "Invalid or expired authentication session. Please sign in again." },
        { status: 401 }
      );
    }

    const identifier = String(payload.id || "");
    const email = String(payload.email || "").trim().toLowerCase();
    const tokenRole = String(payload.role || "").toUpperCase();

    let adminRecord = null;
    let userRecord = null;

    if (identifier) {
      adminRecord = await client.admin.findUnique({ where: { id: identifier } });
      userRecord = await client.user.findUnique({ where: { id: identifier } });
    }

    if (!adminRecord && email) {
      adminRecord = await client.admin.findUnique({ where: { email } });
    }

    if (!userRecord && email) {
      userRecord = await client.user.findUnique({ where: { email } });
    }

    const isAuthorized = Boolean(
      adminRecord ||
      userRecord?.role === "ADMIN" ||
      userRecord?.role === "RECRUITER" ||
      userRecord?.canPostJob === true ||
      tokenRole === "ADMIN" ||
      tokenRole === "RECRUITER" ||
      payload.canPostJob === true
    );

    if (!isAuthorized) {
      return NextResponse.json(
        { msg: "Unauthorized. Admin or Recruiter privileges required to publish roles." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const title = String(body.title || "").trim();
    const description = String(body.description || body.descreption || "").trim();
    const joblink = String(body.joblink || body.link || "").trim();
    const companyname = String(body.companyname || body.companyName || "").trim();
    const location = String(body.location || "").trim();
    const experience = Number(body.experience) || 0;
    const salary = Number(body.salary) || 0;

    if (!title || !description || !companyname) {
      return NextResponse.json(
        { msg: "Missing required fields: title, description, and company name are mandatory." },
        { status: 400 }
      );
    }

    let rawJobTypes = body.jobTypes;
    if (!Array.isArray(rawJobTypes)) {
      rawJobTypes = [body.jobType || "FULLTIME"];
    }
    const validJobTypes = ["FULLTIME", "REMOTE", "INTERNSHIP", "CONTRACT"];
    const jobTypes = rawJobTypes
      .map((t: string) => String(t).toUpperCase())
      .filter((t: string) => validJobTypes.includes(t));

    if (jobTypes.length === 0) {
      jobTypes.push("FULLTIME");
    }

    const postRelation: any = {};
    if (adminRecord) {
      postRelation.postedby = { connect: { id: adminRecord.id } };
    } else if (userRecord) {
      postRelation.postedbyUser = { connect: { id: userRecord.id } };
    }

    const newJob = await client.jobschema.create({
      data: {
        title,
        descreption: description,
        joblink,
        companyname,
        location,
        experience,
        salary,
        jobTypes,
        ...postRelation,
      },
      include: {
        postedby: {
          select: { name: true, email: true },
        },
        postedbyUser: {
          select: { name: true, email: true },
        },
      },
    });

    return NextResponse.json({ success: true, newJob }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { msg: e.message || "Failed to publish job role." },
      { status: 500 }
    );
  }
}
