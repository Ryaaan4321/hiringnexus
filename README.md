# HiringNexus – Job Posting Platform

A modern job posting platform where users can explore jobs, manage their profiles, integrate their GitHub, and receive email alerts for new opportunities — while admins manage postings, track activity, and oversee the platform.

---

## Features

### User Side

- Authentication – Login & Signup
- Profile Management – Create and edit profile details
- GitHub Integration – Add your GitHub profile link
- Job Browsing – View all available jobs
- Email Notifications – Get notified when a new job is posted

### Admin Side

- Job Management – Post new jobs, delete jobs
- User Management – View all registered users
- Activity Tracking – See how many jobs each user has viewed
- Admin Management – View all admins
- Access Control – Delete jobs only if the admin has the right permissions

---

## Tech Stack

| Layer          | Technologies                            |
| -------------- | --------------------------------------- |
| Frontend       | Next.js, React, Tailwind CSS, Shadcn/UI |
| Backend        | Next.js API Routes, Prisma ORM          |
| Authentication | NextAuth.js                             |
| Database       | PostgreSQL (Neon Tech)                  |
| Email Service  | Nodemailer / SMTP                       |
| Styling        | Tailwind CSS, Shadcn/UI                 |

---

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/hiringnexus.git
   cd hiringnexus
   npm install
   ```
2. Set up environment variables in .env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
3. Run Prisma migrations
   npx prisma migrate dev --name init
4. Start the development server
   npm run dev
5. Open in Browser
   http://localhost:3000

## Usage

### For Users

- Sign up or log in
- Complete your profile (add GitHub link if available)
- Browse jobs
- Receive email alerts for new jobs

### For Admins

- Log in with admin credentials
- Post or delete jobs
- View all users and their activity
- Manage other admins and permissions

---

## Future Improvements

- Resume upload and parsing
- AI-powered job recommendations
- Role-based dashboard analytics
- Advanced search & filtering for jobs

## Final Note

"Yes, I’m lazy enough to write this README… but starving enough to write efficient code that pushes to production in one go."
