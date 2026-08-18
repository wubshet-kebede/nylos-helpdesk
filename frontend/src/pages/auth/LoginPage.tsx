// src/pages/LoginPage.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";

// Declare schema contract matching your backend FluentValidation options
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Provide a valid email address"),
  password: z
    .string()
    .min(8, "Security passwords require at least 8 characters"),
});

//  Generate strict TypeScript model type definitions directly from the Zod schema configuration rules
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Inject the Zod rules controller engine
  });

  const onFormSubmit = async (data: LoginFormValues) => {
    // Send typed verified JSON payload straight to backend monolithic API controllers
    console.log("Verified Auth Payload:", data);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-center">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 border border-slate-200 rounded-2xl shadow-sm sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit(onFormSubmit)}>
            {/* Dynamic input field calling RHF registration directly */}
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              icon={Mail}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-50"
            >
              {isSubmitting ? "Authenticating..." : "Sign in to workspace"}
              <ArrowRight size={14} className="text-slate-400" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
