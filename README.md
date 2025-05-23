# Job Posting Website

A modern job posting platform built with **Next.js**, **Prisma**, **NextAuth**, and a UI component library (**Shadcn/UI** or **Material UI**).

## Features
User authentication with **NextAuth** (Google, GitHub, and email login)
Secure database integration using **Prisma ORM** and **PostgreSQL**
Job listing management (Create, Read, Update, Delete jobs)
Role-based access (Admin & Job Seekers)
Server Actions for seamless backend integration

## Tech Stack
- **Frontend:** Next.js, React, Shadcn/UI (or Material UI)
- **Backend:** Next.js API Routes, Prisma ORM
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (Neon.tech or Supabase)
- **Styling:** Tailwind CSS

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/job-posting-platform.git
   cd job-posting-platform
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory and add:
     ```env
     DATABASE_URL="your_postgresql_connection_string"
     NEXTAUTH_SECRET="your_secret_key"
     NEXTAUTH_URL="http://localhost:3000"
     GITHUB_CLIENT_ID="your_github_client_id"
     GITHUB_CLIENT_SECRET="your_github_client_secret"
     ```
4. Run Prisma migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   npm run dev

- Visit `http://localhost:3000`
- Sign in using Google/GitHub
- Post jobs (Admins) or Apply for jobs (Users)

 "yes i m lazy enough to write this readme bt starving enough to write the efficient code to push into the prod in a one go"



