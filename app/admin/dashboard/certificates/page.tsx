import CertificatesClient from "@/components/admin/CertificatesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Certificates - Admin",
};

export default function CertificatesPage() {
  return <CertificatesClient />;
}
