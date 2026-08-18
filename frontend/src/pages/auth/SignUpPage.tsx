import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import Input from "../../components/ui/Input";

// Define the Validation Schema ( Frontend equivalent to FluentValidation )
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
  // Custom Zod refinement to check if the passwords match each other
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This points the error message exactly to the confirmPassword field
  });

//  Extract strict TypeScript values contract directly from our Zod schema configurations
type SignupFormValues = z.infer<typeof signupSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema), // Bind our strict Zod schema rules
  });

  const onRegisterSubmit = async (data: SignupFormValues) => {
    try {
      // Connect to your layered monolithic backend API controller here
      console.log("Validated Sign Up Payload:", data);

      // Navigate straight to workspace upon successful registration response
      navigate("/tickets");
    } catch (apiError) {
      console.error("Backend error response mapping:", apiError);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Monochromatic app emblem badge element matching your footer look */}
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-bold text-lg shadow-sm">
          N
        </div>
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          Create your workspace account
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Set up centralized engineering credentials for support workflows.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Smooth white card block component layout mirroring login panels */}
        <div className="bg-white py-8 px-4 border border-slate-200 rounded-2xl shadow-sm sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit(onRegisterSubmit)}>
            {/* Full Name Input Field */}
            <Input
              id="name"
              label="Full Name"
              type="text"
              placeholder="Alex Rivera"
              icon={User}
              error={errors.name?.message}
              {...register("name")}
            />

            {/* Email Address Input Field */}
            <Input
              id="email"
              label="Work Email Address"
              type="email"
              placeholder="alex@company.com"
              icon={Mail}
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Password Creation Input Field */}
            <Input
              id="password"
              label="Security Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register("password")}
            />

            {/* Confirm Password Verification Input Field */}
            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={ShieldCheck}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Premium action submit selector */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-900 disabled:opacity-50 shadow-sm"
              >
                {isSubmitting
                  ? "Generating profile..."
                  : "Register corporate account"}
                <ArrowRight
                  size={14}
                  className="text-slate-400 group-hover:text-white transition-colors"
                />
              </button>
            </div>
          </form>

          {/* Core Route Switching Links Area */}
          <div className="mt-6 text-center text-xs font-medium text-slate-500 border-t border-slate-100 pt-4">
            Already have a profile key?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
