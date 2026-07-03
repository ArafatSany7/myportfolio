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
    issuer: "CodeSignal",
    image: "/assets/certificate on creational design pattern.png",
    credentialUrl: "https://codesignal.com/learn/certificates/cmmqry3ns000kjs04ogzflfvy/courses/406",
    learningSummary: "This course provided a deep dive into creational design patterns. Understanding how to properly abstract the instantiation process will significantly improve my ability to write modular and reusable code in future enterprise applications.",
    keyFeatures: [
      "Understanding Singleton, Factory, and Builder patterns",
      "Implementing object creation mechanisms",
      "Decoupling system architecture from object creation"
    ]
  },
  {
    id: "c2",
    title: "Structural Design Pattern",
    issuer: "CodeSignal",
    image: "/assets/certification on structural design pattern.png",
    credentialUrl: "https://codesignal.com/learn/certificates/cmmqry3ns000kjs04ogzflfvy/courses/407",
    learningSummary: "Learning structural patterns has equipped me with the skills to design scalable software architectures. By understanding how to compose objects and classes into larger structures, I can build systems that are both flexible and easy to maintain.",
    keyFeatures: [
      "Mastering Adapter, Decorator, and Facade patterns",
      "Designing flexible system architectures",
      "Simplifying relationships between objects"
    ]
  },
  {
    id: "c3",
    title: "Unified Modeling Language",
    issuer: "European Open University",
    image: "/assets/certificate on unified model language.png",
    credentialUrl: "https://academyeurope.org/certificates/e810d68371156b8ac9e64d0fd8f27355/",
    learningSummary: "This certification solidified my system design mindset. Note: This specific credential link is currently private/unavailable publicly, but the knowledge gained allows me to effectively visualize and plan complex architectures before writing any code.",
    keyFeatures: [
      "Creating Use Case and Class Diagrams",
      "Modeling system behavior and state",
      "Visualizing software architecture"
    ]
  },
  {
    id: "c4",
    title: "How to Build Positive Mentality",
    issuer: "Go Edu",
    image: "/assets/certificate on how to build positive mentality.png",
    credentialUrl: "https://goedu.ac/certificate/3fb9755a6d4d4f599ebcdbc48cc0c27f",
    learningSummary: "Technical skills alone aren't enough for long-term success. This course helped me cultivate a resilient and growth-oriented mindset, which is crucial for overcoming difficult debugging sessions and complex project challenges.",
    keyFeatures: [
      "Developing a growth mindset",
      "Overcoming professional challenges",
      "Fostering a productive work environment"
    ]
  },
  {
    id: "c5",
    title: "Soft Skill Hard Skill",
    issuer: "Go Edu",
    image: "/assets/certificate on soft skill hard skill.png",
    credentialUrl: "https://goedu.ac/certificate/84a781c1513145619486bd994759cfe7",
    learningSummary: "This training emphasized the balance between technical excellence and interpersonal effectiveness. It has prepared me to be a better team player, communicate technical concepts clearly, and lead future initiatives smoothly.",
    keyFeatures: [
      "Balancing technical expertise with communication",
      "Effective teamwork and leadership",
      "Time management and problem solving"
    ]
  },
  {
    id: "c6",
    title: "Video Editing",
    issuer: "Go Edu",
    image: "/assets/certificate on video editing.png",
    credentialUrl: "https://goedu.ac/certificate/57da999fca394fafa51bc1f915b0dc54",
    learningSummary: "While outside of traditional software engineering, this skill enhances my ability to produce engaging tech demos, tutorials, and presentations, making me a more versatile developer and digital creator.",
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
