"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  categoryName: z.string().min(1, "Category Name is required"),
  icon: z.string().optional().or(z.literal("")),
});

type SkillFormValues = z.infer<typeof skillSchema>;

export default function SkillsClient() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      categoryName: "",
      icon: "",
    },
  });

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      setSkills(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const onSubmit = async (data: SkillFormValues) => {
    try {
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setIsEditing(false);
        setEditingId(null);
        reset();
        fetchSkills();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (skill: any) => {
    reset({
      name: skill.name,
      categoryName: skill.category?.name || "",
      icon: skill.icon || "",
    });
    setEditingId(skill.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      await fetch(`/api/skills/${id}`, { method: "DELETE" });
      fetchSkills();
    }
  };

  if (isEditing) {
    return (
      <div>
        <AdminPageHeader
          title={editingId ? "Edit Skill" : "New Skill"}
          description="Fill in the details below to save the skill."
          action={
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingId(null);
                reset();
              }}
              className="btn bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          }
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Skill Name</label>
            <input
              {...register("name")}
              placeholder="e.g., React, Node.js"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category Name</label>
            <input
              {...register("categoryName")}
              placeholder="e.g., Frontend, Backend"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.categoryName && <p className="text-destructive text-sm">{errors.categoryName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">React Icon Name (Optional)</label>
            <input
              {...register("icon")}
              placeholder="e.g., FaReact"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">From react-icons/fa. Example: FaReact, FaNodeJs.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? "Update Skill" : "Create Skill"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Skills"
        description="Manage your technical skills and categories."
        action={
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        }
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center p-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No skills found. Create your first one!</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="p-4 font-medium text-foreground">Name</th>
                <th className="p-4 font-medium text-foreground">Category</th>
                <th className="p-4 font-medium text-foreground">Icon</th>
                <th className="p-4 font-medium text-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4 text-foreground font-medium">{skill.name}</td>
                  <td className="p-4 text-muted-foreground">{skill.category?.name}</td>
                  <td className="p-4 text-muted-foreground font-mono text-sm">{skill.icon || "-"}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="p-2 text-foreground bg-muted hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-2 text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
