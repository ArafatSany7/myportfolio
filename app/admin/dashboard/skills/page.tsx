import SkillsClient from "@/components/admin/SkillsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Skills - Admin",
};

export default function SkillsPage() {
  return <SkillsClient />;
}
