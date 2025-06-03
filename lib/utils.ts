import { jwtVerify } from "jose";



// function to validate the token of the middleware
export async function validateToken(token: string): Promise<Boolean> {
  console.log("validate token got called")
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret)
    return true;
  } catch (e: any) {
    console.log("error from validate token fuccc = ", e.message);
    return false;
  }
}
