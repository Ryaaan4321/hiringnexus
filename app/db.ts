import { PrismaClient } from "@prisma/client";
console.log("insdie the db.ts")
const prismaSingleton = () => {
    console.log("Inside the function of the Prisma singleton");
    return new PrismaClient();
};

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? prismaSingleton();
export default prisma;

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = prisma;
}

