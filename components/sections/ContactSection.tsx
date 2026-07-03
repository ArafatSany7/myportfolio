"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block group relative mb-6 cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold pb-2">Get In Touch</h2>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-primary group-hover:w-full transition-all duration-300 ease-out rounded-full"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or want to explore potential opportunities? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          { }
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-muted-foreground mb-8">
              Feel free to reach out to me via email or connect with me on social media. I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <a href="mailto:human.sany7@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                    human.sany7@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p className="text-muted-foreground">
                    Uttara North, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h4 className="font-medium text-lg mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://github.com/ArafatSany7" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/arafatsany" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://web.facebook.com/arafat.sany.836467" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaFacebook size={22} />
                </a>
              </div>
            </div>
          </motion.div>

          { }
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card bg-background shadow-2xl border border-border"
          >
            <div className="card-body p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`input input-bordered w-full bg-muted focus:bg-background ${errors.name ? 'input-error' : ''}`}
                    {...register("name")}
                  />
                  {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Your Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`input input-bordered w-full bg-muted focus:bg-background ${errors.email ? 'input-error' : ''}`}
                    {...register("email")}
                  />
                  {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Subject</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    className={`input input-bordered w-full bg-muted focus:bg-background ${errors.subject ? 'input-error' : ''}`}
                    {...register("subject")}
                  />
                  {errors.subject && <span className="text-error text-xs mt-1">{errors.subject.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    className={`textarea textarea-bordered h-32 w-full bg-muted focus:bg-background ${errors.message ? 'textarea-error' : ''}`}
                    placeholder="Write your message here..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && <span className="text-error text-xs mt-1">{errors.message.message}</span>}
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <div className="alert alert-success mt-4">
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="alert alert-error mt-4">
                    <span>Failed to send message. Please try again later.</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
