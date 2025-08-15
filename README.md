# Job Posting Website

A modern job posting platform built with **Next.js**, **Prisma**, **NextAuth**, and a UI component library (**Shadcn/UI** ).

## Features

**User Side**

Authentication: Login & Signup
Job Browsing: View all available jobs
Profile Management: Create and edit profile details
GitHub Integration: Add GitHub profile link
Email Notifications: Receive emails whenever an admin posts a new job
**Admin Side**
Job Management: Post new jobs, delete jobs
User Management: View all registered users
Activity Tracking: See how many jobs each user has viewed
Admin Management: View all admins
Access Control: Delete jobs only if the admin has required permissions

## Tech Stack
- **Frontend:** Next.js, React, Shadcn/UI (or Material UI)
- **Backend:** Next.js API Routes, Prisma ORM
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL (Neon Tech)
- **Styling:** Tailwind CSS ,ShadCn

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
     JWT_SECRET=your_jwt_secret
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_email_password
     ```
4. Run Prisma migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the development server:
   npm run dev

## Usage
**For Users**:

Sign up or log in
Complete your profile (add GitHub link if available)
Browse jobs in the jobs section
Get email alerts for newly posted jobs

**For Admins**:
Log in with admin credentials
Post or delete jobs
View all users and their activity
Manage other admins and permissions


## Future Improvements
Resume upload and parsing
AI-powered job recommendations
Role-based dashboard analytics
Advanced search & filtering for jobs

- Visit `http://localhost:3000`
- Sign in using Google/GitHub
- Post jobs (Admins) or Apply for jobs (Users)

 "yes i m lazy enough to write this readme bt starving enough to write the efficient code to push into the prod in a one go"



