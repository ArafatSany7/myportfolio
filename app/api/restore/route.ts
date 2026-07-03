import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  console.log("Restoring Skills...")
  const categories = [
    {
      name: "Frontend",
      skills: [
        { name: "HTML5", icon: "FaHtml5" },
        { name: "CSS3", icon: "FaCss3Alt" },
        { name: "JavaScript", icon: "FaJs" },
        { name: "TypeScript", icon: "SiTypescript" },
        { name: "React", icon: "SiReact" },
        { name: "Next.js", icon: "SiNextdotjs" },
        { name: "Tailwind CSS", icon: "SiTailwindcss" },
      ]
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", icon: "SiNodedotjs" },
        { name: "Express.js", icon: "SiExpress" },
        { name: "REST API", icon: "SiNodedotjs" },
      ]
    },
    {
      name: "Database",
      skills: [
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "PostgreSQL", icon: "SiPostgresql" },
        { name: "Prisma", icon: "SiPrisma" },
      ]
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", icon: "FaGitAlt" },
        { name: "GitHub", icon: "FaGithub" },
        { name: "VS Code", icon: "FaCode" }, 
        { name: "Vercel", icon: "SiVercel" },
        { name: "Figma", icon: "FaFigma" },
        { name: "Postman", icon: "SiPostman" },
      ]
    }
  ]

  for (const cat of categories) {
    let category = await prisma.category.findUnique({ where: { name: cat.name } })
    if (!category) {
      category = await prisma.category.create({ data: { name: cat.name } })
    }
    for (const skill of cat.skills) {
      const exists = await prisma.skill.findFirst({ where: { name: skill.name } })
      if (!exists) {
        await prisma.skill.create({
          data: {
            name: skill.name,
            icon: skill.icon,
            categoryId: category.id
          }
        })
      }
    }
  }

  console.log("Restoring Projects...")
  const projects = [
    {
      name: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with Next.js, Stripe, and Prisma.",
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
      purpose: "Built to demonstrate scalable e-commerce architecture.",
      targetUsers: "Online shoppers and small business owners.",
      keyFeatures: [
        "Secure Authentication",
        "Stripe Payment Integration",
        "Admin Dashboard for product management",
        "Responsive Design"
      ],
      challenges: "Handling complex state management for the cart across different devices.",
      futureImprovements: "Implement AI-based product recommendations."
    },
    {
      name: "Task Management App",
      description: "A collaborative task manager with real-time updates.",
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      purpose: "To improve team productivity and task tracking.",
      targetUsers: "Remote teams and project managers.",
      keyFeatures: [
        "Real-time updates via WebSockets",
        "Drag and drop interface",
        "User roles and permissions",
        "Activity logging"
      ],
      challenges: "Ensuring real-time synchronization without race conditions.",
      futureImprovements: "Add integration with Slack and GitHub."
    },
    {
      name: "AI Content Generator",
      description: "An AI-powered application that generates blog posts and social media content.",
      image: "",
      liveUrl: "#",
      githubUrl: "#",
      tags: ["Next.js", "OpenAI API", "Tailwind", "PostgreSQL"],
      purpose: "To help marketers and writers overcome writer's block.",
      targetUsers: "Content creators, marketers, and bloggers.",
      keyFeatures: [
        "Multiple content templates",
        "Save and edit generated content",
        "Export to PDF/Word",
        "Usage tracking and billing"
      ],
      challenges: "Prompt engineering to get consistent, high-quality results from the AI model.",
      futureImprovements: "Add support for image generation."
    }
  ]

  for (const p of projects) {
    const exists = await prisma.project.findFirst({ where: { name: p.name } })
    if (!exists) {
      await prisma.project.create({ data: p })
    }
  }

  console.log("Restoring Services...")
  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive, accessible, and highly interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
      icon: "FaReact"
    },
    {
      title: "Backend Development",
      description: "Developing robust and secure REST APIs and server-side logic using Node.js, Express, and Next.js API Routes.",
      icon: "FaNodeJs"
    },
    {
      title: "Full Stack Development",
      description: "End-to-end web application development, seamlessly integrating beautiful frontends with powerful backend architectures.",
      icon: "FaCode"
    },
    {
      title: "Database Design",
      description: "Designing efficient and scalable database schemas using PostgreSQL and MongoDB, managed with Prisma ORM.",
      icon: "FaDatabase"
    }
  ]

  for (const s of services) {
    const exists = await prisma.service.findFirst({ where: { title: s.title } })
    if (!exists) {
      await prisma.service.create({ data: s })
    }
  }

  console.log("Restoring Education...")
  const education = [
    {
      degree: "BSc in Software Engineering",
      institution: "Daffodil International University",
      passingYear: "Present",
      currentSemester: "7th Semester",
      cgpa: "3.72",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Hosen Ali Sarker Academy",
      passingYear: "2022",
      gpa: "5.00",
    }
  ]

  for (const e of education) {
    const exists = await prisma.education.findFirst({ where: { degree: e.degree } })
    if (!exists) {
      await prisma.education.create({ data: e })
    }
  }

  console.log("Restoring Certificates...")
  const certificates = [
    {
      title: "Creational Design Pattern",
      issuer: "Online Course",
      image: "/assets/certificate on creational design pattern.png",
      keyFeatures: [
        "Understanding Singleton, Factory, and Builder patterns",
        "Implementing object creation mechanisms",
        "Decoupling system architecture from object creation"
      ]
    },
    {
      title: "Structural Design Pattern",
      issuer: "Online Course",
      image: "/assets/certification on structural design pattern.png",
      keyFeatures: [
        "Mastering Adapter, Decorator, and Facade patterns",
        "Designing flexible system architectures",
        "Simplifying relationships between objects"
      ]
    },
    {
      title: "Unified Modeling Language",
      issuer: "Online Course",
      image: "/assets/certificate on unified model language.png",
      keyFeatures: [
        "Creating Use Case and Class Diagrams",
        "Modeling system behavior and state",
        "Visualizing software architecture"
      ]
    },
    {
      title: "How to Build Positive Mentality",
      issuer: "Soft Skills Training",
      image: "/assets/certificate on how to build positive mentality.png",
      keyFeatures: [
        "Developing a growth mindset",
        "Overcoming professional challenges",
        "Fostering a productive work environment"
      ]
    },
    {
      title: "Soft Skill Hard Skill",
      issuer: "Professional Development",
      image: "/assets/certificate on soft skill hard skill.png",
      keyFeatures: [
        "Balancing technical expertise with communication",
        "Effective teamwork and leadership",
        "Time management and problem solving"
      ]
    },
    {
      title: "Video Editing",
      issuer: "Multimedia Course",
      image: "/assets/certificate on video editing.png",
      keyFeatures: [
        "Understanding timelines, transitions, and effects",
        "Audio synchronization and color grading",
        "Producing high-quality digital content"
      ]
    }
  ]

  for (const c of certificates) {
    const exists = await prisma.certificate.findFirst({ where: { title: c.title } })
    if (!exists) {
      await prisma.certificate.create({ data: c })
    }
  }

  return NextResponse.json({ message: "Restored successfully" });
}
