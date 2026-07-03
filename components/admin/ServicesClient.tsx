"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().optional().or(z.literal("")),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export default function ServicesClient() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
    },
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onSubmit = async (data: ServiceFormValues) => {
    try {
      const url = editingId ? `/api/services/${editingId}` : "/api/services";
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
        fetchServices();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (service: any) => {
    reset({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
    });
    setEditingId(service.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await fetch(`/api/services/${id}`, { method: "DELETE" });
      fetchServices();
    }
  };

  if (isEditing) {
    return (
      <div>
        <AdminPageHeader
          title={editingId ? "Edit Service" : "New Service"}
          description="Fill in the details below to save the service."
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
            <label className="text-sm font-medium text-foreground">Service Title</label>
            <input
              {...register("title")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
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
            <label className="text-sm font-medium text-foreground">React Icon Name (Optional)</label>
            <input
              {...register("icon")}
              placeholder="e.g., FaCode"
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground">From react-icons/fa. Example: FaCode, FaPaintBrush.</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? "Update Service" : "Create Service"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Manage the services you offer."
        action={
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        }
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center p-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No services found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4">
                <span className="text-muted-foreground font-mono text-xs">{service.icon || "-"}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">{service.description}</p>
              
              <div className="flex gap-2 mt-6 pt-4 border-t border-border justify-end">
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-foreground bg-muted hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-destructive bg-destructive/10 hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
