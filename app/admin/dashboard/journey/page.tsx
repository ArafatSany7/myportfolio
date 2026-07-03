import JourneyClient from "@/components/admin/JourneyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Journey - Admin",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
