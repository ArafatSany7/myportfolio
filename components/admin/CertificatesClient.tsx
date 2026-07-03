"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  image: z.string().optional().or(z.literal("")),
  credentialUrl: z.string().optional().or(z.literal("")),
  learningSummary: z.string().optional().or(z.literal("")),
  keyFeatures: z.string().optional().or(z.literal("")), // comma separated
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

export default function CertificatesClient() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      issuer: "",
      image: "",
      credentialUrl: "",
      learningSummary: "",
      keyFeatures: "",
    },
  });

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCertificates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const onSubmit = async (data: CertificateFormValues) => {
    try {
      const payload = {
        ...data,
        keyFeatures: data.keyFeatures ? data.keyFeatures.split(",").map((t) => t.trim()) : [],
      };

      const url = editingId ? `/api/certificates/${editingId}` : "/api/certificates";
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
        fetchCertificates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (certificate: any) => {
    reset({
      title: certificate.title,
      issuer: certificate.issuer,
      image: certificate.image || "",
      credentialUrl: certificate.credentialUrl || "",
      learningSummary: certificate.learningSummary || "",
      keyFeatures: certificate.keyFeatures ? certificate.keyFeatures.join(", ") : "",
    });
    setEditingId(certificate.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certificate?")) {
      await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      fetchCertificates();
    }
  };

  if (isEditing) {
    return (
      <div>
        <AdminPageHeader
          title={editingId ? "Edit Certificate" : "New Certificate"}
          description="Fill in the details below to save the certificate."
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
            <label className="text-sm font-medium text-foreground">Certificate Title</label>
            <input
              {...register("title")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Issuer</label>
            <input
              {...register("issuer")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.issuer && <p className="text-destructive text-sm">{errors.issuer.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Certificate Image</label>
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Credential URL</label>
            <input
              {...register("credentialUrl")}
              placeholder="https://..."
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Learning Summary</label>
            <textarea
              {...register("learningSummary")}
              placeholder="A short paragraph about how this certificate helps..."
              rows={3}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Key Features (Comma separated)</label>
            <textarea
              {...register("keyFeatures")}
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? "Update Certificate" : "Create Certificate"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title="Certificates"
        description="Manage your professional certificates and credentials."
        action={
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </button>
        }
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : certificates.length === 0 ? (
        <div className="text-center p-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No certificates found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row group hover:border-primary/50 transition-colors">
              <div className="w-full md:w-1/3 h-48 md:h-auto bg-muted relative">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-foreground line-clamp-1">{cert.title}</h3>
                <p className="text-sm font-medium text-primary mt-1">{cert.issuer}</p>
                <div className="flex gap-2 mt-4 pt-4 border-t border-border justify-end">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-2 text-foreground bg-muted hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
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
