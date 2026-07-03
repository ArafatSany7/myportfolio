import ServicesClient from "@/components/admin/ServicesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Services - Admin",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
