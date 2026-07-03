"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().optional().or(z.literal("")),
  tags: z.string().min(1, "At least one tag is required"), 
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  purpose: z.string().optional().or(z.literal("")),
  targetUsers: z.string().optional().or(z.literal("")),
  keyFeatures: z.string().optional().or(z.literal("")), // comma separated
  challenges: z.string().optional().or(z.literal("")),
  futureImprovements: z.string().optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectsClient() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      tags: "",
      githubUrl: "",
      liveUrl: "",
      purpose: "",
      targetUsers: "",
      keyFeatures: "",
      challenges: "",
      futureImprovements: "",
    },
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const payload = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
        keyFeatures: data.keyFeatures ? data.keyFeatures.split(",").map((t) => t.trim()) : [],
      };

      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsEditing(false);
        setEditingId(null);
        reset();
        fetchProjects();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: any) => {
    reset({
      name: project.name,
      description: project.description,
      image: project.image || "",
      tags: project.tags ? project.tags.join(", ") : "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      purpose: project.purpose || "",
      targetUsers: project.targetUsers || "",
      keyFeatures: project.keyFeatures ? project.keyFeatures.join(", ") : "",
      challenges: project.challenges || "",
      futureImprovements: project.futureImprovements || "",
    });
    setEditingId(project.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  if (isEditing) {
    return (
      <div>
        <AdminPageHeader
          title={editingId ? "Edit Project" : "New Project"}
          description="Fill in the details below to save the project."
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Project Name</label>
            <input
              {...register("name")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Image Upload</label>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  onRemove={() => field.onChange("")}
                />
              )}
            />
            {errors.image && <p className="text-destructive text-sm">{errors.image.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tags (Comma separated)</label>
            <input
              {...register("tags")}
              placeholder="React, Next.js, Tailwind"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.tags && <p className="text-destructive text-sm">{errors.tags.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input
                {...register("githubUrl")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Live URL</label>
              <input
                {...register("liveUrl")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Purpose</label>
              <input
                {...register("purpose")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Target Users</label>
              <input
                {...register("targetUsers")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Key Features (Comma separated)</label>
            <input
              {...register("keyFeatures")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Challenges</label>
              <textarea
                {...register("challenges")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Future Improvements</label>
              <textarea
                {...register("futureImprovements")}
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? "Update Project" : "Create Project"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio projects."
        action={
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        }
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center p-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No projects found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col group hover:border-primary/50 transition-colors">
              <div className="h-48 bg-muted relative">
                {project.image ? (
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-foreground line-clamp-1">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">{project.description}</p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border justify-end">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-foreground bg-muted hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
