# Personal Portfolio Website

## Overview
A modern, dynamic personal portfolio website designed to showcase my projects, skills, professional journey, and services. Built with Next.js and React, it features a sleek, responsive design powered by Tailwind CSS, along with smooth animations using Framer Motion. The portfolio also integrates a backend using Prisma and PostgreSQL to manage dynamic content such as featured projects.

## Screenshot
![Portfolio Overview](./public/projects/dev%20main.png)

## Primary Technologies
- **Frontend Framework:** Next.js (App Router), React
- **Styling:** Tailwind CSS, Shadcn UI, DaisyUI
- **Animations:** Framer Motion, Tailwind CSS Animate
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** Next-Auth
- **Media Management:** Next Cloudinary

## Key Features
- **Dynamic Sections:** Includes Hero, About, Skills, Projects, Journey, Services, and Contact sections.
- **Database Integration:** Projects and dynamic data are fetched from a PostgreSQL database using Prisma.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewing.
- **Modern UI/UX:** Clean aesthetics, glassmorphism, and smooth micro-animations.
- **Dark/Light Mode:** Integrated theme toggling using `next-themes`.
- **Form Handling:** Robust contact form management using React Hook Form and Zod validation.

## Project Dependencies
The project relies on a number of key open-source packages:
- `next`
- `react` / `react-dom`
- `@prisma/client` / `@prisma/adapter-pg` / `pg`
- `tailwindcss` / `tailwind-merge` / `tailwindcss-animate`
- `framer-motion`
- `shadcn` / `daisyui`
- `next-auth`
- `react-hook-form` / `@hookform/resolvers` / `zod`
- `next-cloudinary`
- `nodemailer` (for sending contact emails)
- `lucide-react` / `react-icons`

## Running Locally

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL database

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd myportfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Ensure you have a `.env` file in the root directory and add the necessary environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   ```
   *(Check your existing `.env` for the exact required variables).*

4. **Database Setup:**
   Run Prisma migrations to set up the database schema and generate the client:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Links
- **Live Demo:** [https://arafat-sany.vercel.app/](https://arafat-sany.vercel.app/)
- **GitHub Repository:** [https://github.com/ArafatSany7/myportfolio](https://github.com/ArafatSany7/myportfolio)
