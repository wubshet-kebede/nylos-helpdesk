import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

import Input from "../../components/ui/Input";
import { authService } from "../../api/auth/authService";

// Frontend validation schema
const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .max(50, "Name must be under 50 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Provide a valid corporate email address"),

    password: z
      .string()
      .min(8, "Security password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numerical digit"),

    confirmPassword: z.string().min(1, "Please re-type your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (data: SignupFormValues) => {
    try {
      await authService.register({
        fullName: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login");
    } catch (err: any) {
      setApiError(err.detail || err.title || "Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#fbfbfa] py-12 text-center sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white shadow-sm transition hover:bg-slate-900"
        >
          N
        </Link>

        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Create your workspace account
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Set up centralized engineering credentials for support workflows.
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 px-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 shadow-sm sm:px-10">
          <form
            className="space-y-5 text-left"
            onSubmit={handleSubmit(onRegisterSubmit)}
          >
            <Input
              id="name"
              label="Full Name"
              type="text"
              placeholder="Alex Rivera"
              icon={User}
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              id="email"
              label="Work Email Address"
              type="email"
              placeholder="alex@company.com"
              icon={Mail}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              id="password"
              label="Security Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={ShieldCheck}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating account..." : "Signup"}

              {!isSubmitting && (
                <ArrowRight
                  size={14}
                  className="text-slate-400 transition-colors group-hover:text-white"
                />
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center text-xs font-medium text-slate-500">
            Already have a profile key?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 hover:underline"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
