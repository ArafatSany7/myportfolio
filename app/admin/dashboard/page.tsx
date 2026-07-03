import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  
  const [
    projectsCount,
    skillsCount,
    certificatesCount,
    servicesCount,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.service.count(),
  ]);

  const stats = [
    { name: "Projects", value: projectsCount, color: "text-primary" },
    { name: "Skills", value: skillsCount, color: "text-secondary" },
    { name: "Certificates", value: certificatesCount, color: "text-accent" },
    { name: "Services", value: servicesCount, color: "text-info" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="card bg-background shadow-sm border border-border">
            <div className="card-body">
              <h2 className="card-title text-muted-foreground">{stat.name}</h2>
              <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card bg-background shadow-sm border border-border">
        <div className="card-body">
          <h2 className="card-title mb-4">Welcome to your Dashboard</h2>
          <p className="text-muted-foreground">
            Use the sidebar to navigate through different sections and manage your portfolio content.
            All changes will be reflected immediately on your main portfolio website.
          </p>
          <div className="mt-4 p-4 bg-primary/10 rounded-lg text-sm text-muted-foreground">
            <strong>Note:</strong> Currently, image uploads (for projects and certificates) should be handled via standard URL input until Cloudinary integration is fully wired up in the forms.
          </div>
        </div>
      </div>
    </div>
  );
}
