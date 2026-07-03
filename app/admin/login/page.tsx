"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="card w-full max-w-md bg-background shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Admin Login</h1>
            <p className="text-muted-foreground mt-2">Access the portfolio dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium py-2">Email Address</span>
              </label>
              <div className="relative">

                <input
                  type="email"
                  placeholder="admin@example.com"
                  className={`input input-bordered w-full pl-2 text-left bg-muted focus:bg-background ${errors.email ? 'input-error' : ''}`}
                  {...register("email")}
                />
              </div>
              {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium py-2">Password</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pl-2 pr-10 text-left bg-muted focus:bg-background ${errors.password ? 'input-error' : ''}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            {error && (
              <div className="alert alert-error mt-4 p-3 rounded-lg">
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
