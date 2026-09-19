import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const hrPassword = await bcrypt.hash("hr123456", 10);
  const candidatePassword = await bcrypt.hash("candidate123", 10);

  await prisma.user.upsert({
    where: { email: "admin@hiringnexus.com" },
    update: {
      role: Role.ADMIN,
      canPostJob: true,
      canDeleteJob: true,
      password: adminPassword,
    },
    create: {
      email: "admin@hiringnexus.com",
      name: "Nexus Administrator",
      username: "nexus_admin",
      password: adminPassword,
      role: Role.ADMIN,
      canPostJob: true,
      canDeleteJob: true,
      profession: "Platform Lead",
      descreption: "Super Administrator of HiringNexus",
    },
  });

  await prisma.admin.upsert({
    where: { email: "admin@hiringnexus.com" },
    update: {
      password: adminPassword,
      canPostJob: true,
      canDeleteJob: true,
    },
    create: {
      email: "admin@hiringnexus.com",
      name: "Nexus Administrator",
      username: "nexus_admin",
      password: adminPassword,
      phonenumber: "+15550199283",
      canPostJob: true,
      canDeleteJob: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "hr@hiringnexus.com" },
    update: {
      role: Role.RECRUITER,
      canPostJob: true,
      password: hrPassword,
      companyName: "Nexus Cloud Systems",
      companyWebsite: "https://hiringnexus.com",
    },
    create: {
      email: "hr@hiringnexus.com",
      name: "Sarah Jenkins (HR Lead)",
      username: "nexus_hr",
      password: hrPassword,
      role: Role.RECRUITER,
      canPostJob: true,
      companyName: "Nexus Cloud Systems",
      companyWebsite: "https://hiringnexus.com",
      profession: "Technical Talent Lead",
      descreption: "Hiring engineering craftspeople for distributed infrastructure.",
    },
  });

  await prisma.user.upsert({
    where: { email: "candidate@hiringnexus.com" },
    update: {
      role: Role.CANDIDATE,
      password: candidatePassword,
    },
    create: {
      email: "candidate@hiringnexus.com",
      name: "Alex Rivera",
      username: "alex_developer",
      password: candidatePassword,
      role: Role.CANDIDATE,
      profession: "Distributed Systems Engineer",
      descreption: "Rust and Go builder with focus on raft consensus and telemetry.",
      skills: ["Rust", "Go", "Distributed Systems", "PostgreSQL", "Next.js"],
      location: "San Francisco, CA",
      ctc: "$180,000",
    },
  });
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
