import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/FadeIn";

const ProjectsClient = dynamic(() => import("./ProjectsClient").then(mod => mod.ProjectsClient), { ssr: true });

const STATIC_PROJECTS = [
  {
    id: "p1",
    title: "E-Commerce Platform", 
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
    id: "p2",
    title: "Task Management App",
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
    id: "p3",
    title: "AI Content Generator",
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
];

export default async function ProjectsSection() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { createdAt: "asc" },
  });

  
  const dynamicProjects = dbProjects.map(p => ({ ...p, title: p.name }));

  const allProjects = [...STATIC_PROJECTS, ...dynamicProjects];

  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">Featured Projects</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of my recent work. Each project is built to solve real-world problems with modern tech stacks.
          </p>
        </FadeIn>

        <ProjectsClient projects={allProjects} />
      </div>
    </section>
  );
}
