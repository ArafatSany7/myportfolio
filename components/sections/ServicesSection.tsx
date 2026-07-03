import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/animations/FadeIn";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

const STATIC_SERVICES = [
  {
    id: "serv1",
    title: "Frontend Development",
    description: "Building responsive, accessible, and highly interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind.",
    icon: "FaReact"
  },
  {
    id: "serv2",
    title: "Backend Development",
    description: "Developing robust and secure REST APIs and server-side logic using Node.js, Express, and Next.js API Routes.",
    icon: "FaNodeJs"
  },
  {
    id: "serv3",
    title: "Full Stack Development",
    description: "End-to-end web application development, seamlessly integrating beautiful frontends with powerful backend architectures.",
    icon: "FaCode"
  },
  {
    id: "serv4",
    title: "Database Design",
    description: "Designing efficient and scalable database schemas using PostgreSQL and MongoDB, managed with Prisma ORM.",
    icon: "FaDatabase"
  }
];

export default async function ServicesSection() {
  const dbServices = await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  });

  const allServices = [...STATIC_SERVICES, ...dbServices];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">My Services</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            What I can do for you. I offer a comprehensive suite of services to help you build your digital product.
          </p>
        </FadeIn>

        {(!allServices || allServices.length === 0) ? (
          <div className="text-center text-muted-foreground p-12 bg-background rounded-xl border border-border">
            No services found. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allServices.map((service, index) => (
              <FadeIn
                key={service.id}
                delay={index * 0.1}
                className="card bg-background shadow-xl border border-border hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="card-body relative z-10">
                  <div className="mb-4 bg-muted w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <DynamicIcon name={service.icon || "FaCode"} className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="card-title text-2xl mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
