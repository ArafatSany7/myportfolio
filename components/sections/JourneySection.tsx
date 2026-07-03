import { prisma } from "@/lib/prisma";
import dynamic from "next/dynamic";

const JourneyClient = dynamic(() => import("./JourneyClient").then(mod => mod.JourneyClient), { ssr: true });

const STATIC_EDUCATION = [
  {
    id: "e1",
    degree: "BSc in Software Engineering",
    institution: "Daffodil International University",
    passingYear: "Present",
    currentSemester: "7th Semester",
    cgpa: "3.72",
  },
  {
    id: "e2",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Hosen Ali Sarker Academy",
    passingYear: "2022",
    gpa: "5.00",
  }
];

const STATIC_CERTIFICATES = [
  {
    id: "c1",
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
    id: "c2",
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
    id: "c3",
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
    id: "c4",
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
    id: "c5",
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
    id: "c6",
    title: "Video Editing",
    issuer: "Multimedia Course",
    image: "/assets/certificate on video editing.png",
    keyFeatures: [
      "Understanding timelines, transitions, and effects",
      "Audio synchronization and color grading",
      "Producing high-quality digital content"
    ]
  }
];

export default async function JourneySection() {
  const dbEducation = await prisma.education.findMany({
    orderBy: { createdAt: "asc" },
  });

  const dbCertificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "asc" },
  });

  const allEducation = [...STATIC_EDUCATION, ...dbEducation];
  const allCertificates = [...STATIC_CERTIFICATES, ...dbCertificates];

  return <JourneyClient education={allEducation} certificates={allCertificates} />;
}
