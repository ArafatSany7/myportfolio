"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const eduSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  passingYear: z.string().min(1, "Passing Year is required"),
  gpa: z.string().optional().or(z.literal("")),
  cgpa: z.string().optional().or(z.literal("")),
  currentSemester: z.string().optional().or(z.literal("")),
});

const expSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
});

type EduFormValues = z.infer<typeof eduSchema>;
type ExpFormValues = z.infer<typeof expSchema>;

export default function JourneyClient() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");
  
  const [education, setEducation] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register: registerEdu,
    handleSubmit: handleSubmitEdu,
    reset: resetEdu,
    formState: { errors: errorsEdu, isSubmitting: isSubmittingEdu },
  } = useForm<EduFormValues>({
    resolver: zodResolver(eduSchema),
    defaultValues: { degree: "", institution: "", passingYear: "", gpa: "", cgpa: "", currentSemester: "" },
  });

  const {
    register: registerExp,
    handleSubmit: handleSubmitExp,
    reset: resetExp,
    formState: { errors: errorsExp, isSubmitting: isSubmittingExp },
  } = useForm<ExpFormValues>({
    resolver: zodResolver(expSchema),
    defaultValues: { role: "", company: "", duration: "", description: "" },
  });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resEdu, resExp] = await Promise.all([
        fetch("/api/education"),
        fetch("/api/experience")
      ]);
      const dataEdu = await resEdu.json();
      const dataExp = await resExp.json();
      setEducation(Array.isArray(dataEdu) ? dataEdu : []);
      setExperience(Array.isArray(dataExp) ? dataExp : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onEduSubmit = async (data: EduFormValues) => {
    try {
      const url = editingId ? `/api/education/${editingId}` : "/api/education";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsEditingEdu(false);
        setEditingId(null);
        resetEdu();
        fetchAll();
      }
    } catch (error) {}
  };

  const onExpSubmit = async (data: ExpFormValues) => {
    try {
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsEditingExp(false);
        setEditingId(null);
        resetExp();
        fetchAll();
      }
    } catch (error) {}
  };

  const handleEditEdu = (item: any) => {
    resetEdu({
      degree: item.degree, institution: item.institution, passingYear: item.passingYear,
      gpa: item.gpa || "", cgpa: item.cgpa || "", currentSemester: item.currentSemester || "",
    });
    setEditingId(item.id);
    setIsEditingEdu(true);
  };

  const handleEditExp = (item: any) => {
    resetExp({
      role: item.role, company: item.company, duration: item.duration, description: item.description,
    });
    setEditingId(item.id);
    setIsEditingExp(true);
  };

  const handleDelete = async (type: "education" | "experience", id: string) => {
    if (confirm(`Are you sure you want to delete this ${type} entry?`)) {
      await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      fetchAll();
    }
  };

  if (isEditingEdu) {
    return (
      <div>
        <AdminPageHeader title={editingId ? "Edit Education" : "New Education"} description="Save education entry." action={<button onClick={() => { setIsEditingEdu(false); setEditingId(null); resetEdu(); }} className="btn bg-muted px-4 py-2 rounded-md">Cancel</button>} />
        <form onSubmit={handleSubmitEdu(onEduSubmit)} className="space-y-6 max-w-xl bg-card p-6 rounded-xl border border-border shadow-sm">
          <input {...registerEdu("degree")} placeholder="Degree" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <input {...registerEdu("institution")} placeholder="Institution" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <input {...registerEdu("passingYear")} placeholder="Passing Year" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <div className="grid grid-cols-2 gap-4">
            <input {...registerEdu("gpa")} placeholder="GPA (Optional)" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
            <input {...registerEdu("cgpa")} placeholder="CGPA (Optional)" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          </div>
          <input {...registerEdu("currentSemester")} placeholder="Current Semester (Optional)" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <button type="submit" disabled={isSubmittingEdu} className="w-full bg-primary text-primary-foreground py-2 rounded-md">{isSubmittingEdu ? "Saving..." : "Save Education"}</button>
        </form>
      </div>
    );
  }

  if (isEditingExp) {
    return (
      <div>
        <AdminPageHeader title={editingId ? "Edit Experience" : "New Experience"} description="Save experience entry." action={<button onClick={() => { setIsEditingExp(false); setEditingId(null); resetExp(); }} className="btn bg-muted px-4 py-2 rounded-md">Cancel</button>} />
        <form onSubmit={handleSubmitExp(onExpSubmit)} className="space-y-6 max-w-xl bg-card p-6 rounded-xl border border-border shadow-sm">
          <input {...registerExp("role")} placeholder="Role" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <input {...registerExp("company")} placeholder="Company" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <input {...registerExp("duration")} placeholder="Duration (e.g. Jan 2020 - Present)" className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <textarea {...registerExp("description")} placeholder="Description" rows={4} className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground" />
          <button type="submit" disabled={isSubmittingExp} className="w-full bg-primary text-primary-foreground py-2 rounded-md">{isSubmittingExp ? "Saving..." : "Save Experience"}</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Journey" description="Manage Education and Experience." />
      
      <div className="flex gap-4 mb-6 border-b border-border pb-2">
        <button onClick={() => setActiveTab("education")} className={`px-4 py-2 font-medium ${activeTab === "education" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>Education</button>
        <button onClick={() => setActiveTab("experience")} className={`px-4 py-2 font-medium ${activeTab === "experience" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>Experience</button>
      </div>

      {activeTab === "education" && (
        <div>
          <button onClick={() => setIsEditingEdu(true)} className="mb-6 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2"><Plus size={16}/> Add Education</button>
          <div className="space-y-4">
            {education.map(item => (
              <div key={item.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-foreground">{item.degree}</h3>
                  <p className="text-muted-foreground text-sm">{item.institution} • {item.passingYear}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditEdu(item)} className="p-2 bg-muted rounded-md"><Edit size={16}/></button>
                  <button onClick={() => handleDelete("education", item.id)} className="p-2 bg-destructive/10 text-destructive rounded-md"><Trash size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "experience" && (
        <div>
          <button onClick={() => setIsEditingExp(true)} className="mb-6 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2"><Plus size={16}/> Add Experience</button>
          <div className="space-y-4">
            {experience.map(item => (
              <div key={item.id} className="bg-card p-4 rounded-xl border border-border shadow-sm flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-foreground">{item.role}</h3>
                  <p className="text-muted-foreground text-sm">{item.company} • {item.duration}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEditExp(item)} className="p-2 bg-muted rounded-md"><Edit size={16}/></button>
                  <button onClick={() => handleDelete("experience", item.id)} className="p-2 bg-destructive/10 text-destructive rounded-md"><Trash size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
