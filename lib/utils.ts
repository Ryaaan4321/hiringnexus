import { jwtVerify } from "jose";
import SECRET_KEY from "@/lib/config";


// function to validate the token of the middleware
export async function validateToken(token: string): Promise<Boolean> {
  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const { payload } = await jwtVerify(token, secret)
    return true;
  } catch (e: any) {
    console.log("error from validate token fuccc = ", e.message);
    return false;
  }
}
