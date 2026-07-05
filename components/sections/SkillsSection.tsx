import { FadeIn } from "@/components/animations/FadeIn";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { prisma } from "@/lib/prisma";

const STATIC_CATEGORIES = [
  {
    name: "Frontend",
    skills: [
      { id: 's1', name: "HTML5", icon: "FaHtml5" },
      { id: 's2', name: "CSS3", icon: "FaCss3Alt" },
      { id: 's3', name: "JavaScript", icon: "FaJs" },
      { id: 's4', name: "TypeScript", icon: "SiTypescript" },
      { id: 's5', name: "React", icon: "SiReact" },
      { id: 's6', name: "Next.js", icon: "SiNextdotjs" },
      { id: 's7', name: "Tailwind CSS", icon: "SiTailwindcss" },
    ]
  },
  {
    name: "Backend",
    skills: [
      { id: 's8', name: "Node.js", icon: "SiNodedotjs" },
      { id: 's9', name: "Express.js", icon: "SiExpress" },
      { id: 's10', name: "REST API", icon: "SiNodedotjs" },
      { id: 's10b', name: "GraphQL", icon: "SiGraphql" },
      { id: 's10c', name: "NestJS", icon: "SiNestjs" },
      { id: 's10d', name: "Socket.io", icon: "SiSocketdotio" },
      { id: 's10e', name: "JWT", icon: "SiJsonwebtokens" },
    ]
  },
  {
    name: "Database",
    skills: [
      { id: 's11', name: "MongoDB", icon: "SiMongodb" },
      { id: 's12', name: "PostgreSQL", icon: "SiPostgresql" },
      { id: 's13', name: "Prisma", icon: "SiPrisma" },
      { id: 's13b', name: "MySQL", icon: "SiMysql" },
      { id: 's13c', name: "Redis", icon: "SiRedis" },
      { id: 's13d', name: "Supabase", icon: "SiSupabase" },
    ]
  },
  {
    name: "Tools",
    skills: [
      { id: 's14', name: "Git", icon: "FaGitAlt" },
      { id: 's15', name: "GitHub", icon: "FaGithub" },
      { id: 's16', name: "VS Code", icon: "FaCode" },
      { id: 's17', name: "Vercel", icon: "SiVercel" },
      { id: 's18', name: "Figma", icon: "FaFigma" },
      { id: 's19', name: "Postman", icon: "SiPostman" },
    ]
  }
];

export default async function SkillsSection() {
  const skillsData = await prisma.skill.findMany({
    include: { category: true },
    orderBy: { createdAt: "asc" },
  });

  
  const categories = JSON.parse(JSON.stringify(STATIC_CATEGORIES));

  
  skillsData.forEach((skill: any) => {
    const catName = skill.category?.name || "Other";
    const existingCat = categories.find((c: any) => c.name.toLowerCase() === catName.toLowerCase());
    
    if (existingCat) {
      existingCat.skills.push(skill);
    } else {
      categories.push({
        name: catName,
        skills: [skill]
      });
    }
  });

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">Technical Skills</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My technical stack and the tools I use to build scalable web applications.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category: any, index: number) => (
            <FadeIn
              key={category.name}
              delay={index * 0.1}
              className="card bg-background shadow-xl border border-border"
            >
              <div className="card-body">
                <h3 className="card-title text-xl mb-4 border-b border-border pb-2 text-primary">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill: any) => (
                    <div 
                      key={skill.id}
                      className="flex items-center gap-3 bg-muted px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <span className="text-3xl">
                        <DynamicIcon name={skill.icon || "FaCode"} className={skill.icon?.startsWith("Si") ? "text-primary" : "text-foreground"} />
                      </span>
                      <span className="text-base font-semibold">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
