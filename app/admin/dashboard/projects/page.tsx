import ProjectsClient from "@/components/admin/ProjectsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Projects - Admin",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
