import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import Input from "../../components/ui/Input";
import { useAuth } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Provide a valid email address"),

  password: z
    .string()
    .min(8, "Security passwords require at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onFormSubmit = async (data: LoginFormValues) => {
    try {
      setApiError(null);

      await login({
        email: data.email,
        password: data.password,
      });

      navigate("/app/dashboard");
    } catch (err: any) {
      setApiError(err?.detail || err?.title || "Invalid email or password.");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F8F8F6] text-slate-900 antialiased">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="nylosGraphite" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#11110F" />

              <stop offset="70%" stopColor="#11110F" />

              <stop offset="100%" stopColor="#151412" />
            </linearGradient>

            <filter id="wingGlow" x="-50%" y="-20%" width="200%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <path
            d="
              M0 0

              L920 0

              C1085 55 1195 125 1160 235

              C1125 345 1015 370 990 465

              C965 560 1090 605 1120 695

              C1150 790 1035 875 900 1000

              L0 1000

              Z
            "
            fill="url(#nylosGraphite)"
          />

          <motion.path
            d="
              M920 0

              C1085 55 1195 125 1160 235

              C1125 345 1015 370 990 465

              C965 560 1090 605 1120 695

              C1150 790 1035 875 900 1000
            "
            fill="none"
            stroke="rgba(196,181,253,0.14)"
            strokeWidth="25"
            filter="url(#wingGlow)"
            animate={{
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.path
            d="
              M920 0

              C1085 55 1195 125 1160 235

              C1125 345 1015 370 990 465

              C965 560 1090 605 1120 695

              C1150 790 1035 875 900 1000
            "
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
            animate={{
              opacity: [0.25, 0.7, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
          }}
        />

        <motion.div
          className="absolute -left-64 -top-64 h-[650px] w-[650px] rounded-full bg-violet-500/[0.055] blur-[150px]"
          animate={{
            x: [-30, 100, -50, -30],
            y: [-20, 80, 150, -20],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-72 left-[38%] h-[600px] w-[600px] rounded-full bg-violet-900/[0.035] blur-[160px]"
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -70, 30, 0],
            scale: [1, 1.1, 0.94, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[32%] top-[48%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.025] blur-[120px]"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {Array.from({ length: 22 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-[2px] w-[2px] rounded-full bg-violet-200/25"
            style={{
              left: `${5 + ((index * 19) % 88)}%`,
              top: `${7 + ((index * 31) % 86)}%`,
            }}
            animate={{
              x: [
                0,
                Math.sin(index * 1.4) * 35,
                Math.cos(index * 1.1) * -25,
                0,
              ],
              y: [0, -20 - (index % 4) * 10, 15, 0],
              opacity: [0.05, 0.4, 0.1, 0.05],
              scale: [1, 1.7, 0.7, 1],
            }}
            transition={{
              duration: 7 + (index % 5),
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Large orbit */}
          <motion.div
            className="absolute left-[30%] top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 55,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner orbit */}
          <motion.div
            className="absolute left-[30%] top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.035]"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Small orbit */}
          <motion.div
            className="absolute left-[30%] top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.02]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute left-[18%] top-1/2 select-none whitespace-nowrap text-[clamp(8rem,18vw,18rem)] font-black leading-none tracking-[-0.1em] text-[#F4F0FF]/[0.035]"
            animate={{
              x: [-100, 80, -50, 95, -100],
              y: [-50, 60, 20, -65, -50],
              rotate: [-3, 2.2, -1.5, 2.8, -3],
              scale: [1, 1.035, 0.985, 1.025, 1],
            }}
            transition={{
              duration: 21,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            NYLOS
          </motion.div>

          <motion.div
            className="absolute left-[18%] top-1/2 select-none whitespace-nowrap text-[clamp(7rem,16vw,16rem)] font-black leading-none tracking-[-0.1em] text-violet-300/[0.035]"
            animate={{
              x: [110, -70, 45, -110, 110],
              y: [55, -45, -75, 35, 55],
              rotate: [2, -2.8, 1.2, -2, 2],
              scale: [1, 0.975, 1.025, 0.985, 1],
            }}
            transition={{
              duration: 29,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            NYLOS
          </motion.div>

          {/* Center glow */}
          <motion.div
            className="absolute left-[30%] top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.045] blur-[100px]"
            animate={{
              scale: [0.9, 1.3, 0.9],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="absolute left-12 top-10 z-10 flex items-center gap-3 xl:left-16"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/[0.1] bg-white/[0.035] backdrop-blur-md">
            <span className="text-sm font-black tracking-[-0.08em] text-white">
              N
            </span>

            <span className="absolute ml-[19px] mt-[15px] h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_7px_rgba(196,181,253,0.8)]" />
          </div>

          <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
            Nylos
            <span className="text-violet-300">Desk</span>
          </span>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.9,
          }}
          className="absolute left-12 top-1/2 z-10 w-[420px] -translate-y-1/2 xl:left-16"
        >
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-violet-300/60">
            Support infrastructure
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#F5F3EF] sm:text-5xl lg:text-[3.55rem]">
            Resolve issues.
            <br />
            <span className="text-white/35">Move forward.</span>
          </h1>

          <p className="mt-7 max-w-md text-[15px] leading-7 text-white/35">
            A focused workspace for teams that need clarity, speed, and complete
            context when solving customer problems.
          </p>

          <motion.div
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
            }}
            transition={{
              delay: 0.8,
              duration: 1.1,
            }}
            className="mt-12 max-w-sm"
          >
            <div className="h-px bg-gradient-to-r from-violet-300/30 via-white/10 to-transparent" />
          </motion.div>

          <div className="mt-5 flex items-center gap-3 text-[11px] tracking-wide text-white/25">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-violet-300/70"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 0px rgba(196,181,253,0)",
                  "0 0 9px rgba(196,181,253,0.55)",
                  "0 0 0px rgba(196,181,253,0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />
            Intelligent support infrastructure
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-12 right-16 z-10 flex items-center justify-between text-[11px] text-white/20 xl:left-16">
          <span>© {new Date().getFullYear()} Nylos Tech Inc.</span>

          <span className="flex items-center gap-2">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
              animate={{
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 0px rgba(52,211,153,0)",
                  "0 0 8px rgba(52,211,153,0.5)",
                  "0 0 0px rgba(52,211,153,0)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />
            Operational
          </span>
        </div>
      </div>

      <main className="relative z-30 flex min-h-screen w-full items-center justify-end px-6 py-8 sm:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full max-w-md rounded-[28px] border border-white/80 bg-[#F8F8F6]/[0.96] p-8 shadow-[0_30px_90px_rgba(17,17,15,0.10)] backdrop-blur-xl sm:p-10"
        >
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-sm font-black tracking-[-0.08em] text-slate-900 shadow-sm">
              N
            </div>

            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Nylos
              <span className="text-violet-600">Desk</span>
            </span>
          </div>

          <div>
            <motion.button
              type="button"
              onClick={() => navigate("/")}
              initial={{
                opacity: 0,
                x: -10,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.05,
                duration: 0.5,
              }}
              whileHover={{
                x: -3,
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="group mb-7 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 hover:shadow-md hover:shadow-violet-500/10"
              aria-label="Back to landing page"
            >
              <motion.span
                animate={{
                  x: [0, -2, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowLeft size={17} />
              </motion.span>
            </motion.button>

            <motion.h2
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
              }}
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Welcome back
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="mt-2 text-sm leading-6 text-slate-500"
            >
              Please enter your credentials to access your workspace.
            </motion.p>
          </div>

          {apiError && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-7 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm font-medium text-rose-700"
            >
              <AlertCircle size={18} className="shrink-0 text-rose-600" />

              <span>{apiError}</span>
            </motion.div>
          )}

          <form
            className="mt-7 space-y-5"
            onSubmit={handleSubmit(onFormSubmit)}
          >
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

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={
                !isSubmitting
                  ? {
                      y: -2,
                    }
                  : undefined
              }
              whileTap={
                !isSubmitting
                  ? {
                      scale: 0.985,
                    }
                  : undefined
              }
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all hover:bg-amber-800 hover:shadow-violet-600/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Login</span>

                  <motion.span
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight size={16} />
                  </motion.span>
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="pt-7 text-center"
          >
            <p className="text-sm text-slate-500">
              New to NylosDesk?{" "}
              <motion.button
                type="button"
                onClick={() => navigate("/register")}
                whileHover={{
                  y: -1,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-1 font-semibold text-amber-950 transition-colors hover:text-amber-700"
              >
                Create an account
                <motion.span
                  animate={{
                    x: [0, 2, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight size={15} strokeWidth={2.5} />
                </motion.span>
              </motion.button>
            </p>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 1,
              }}
              className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400"
            >
              <ShieldCheck size={13} />
              Protected by Nylos Enterprise Security
            </motion.p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
