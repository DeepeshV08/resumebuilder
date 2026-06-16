"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { loginApi } from "@/apis/auth.api";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await loginApi(data);

      router.push("/dashboard");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EF] flex">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#8C4A2F] via-[#A85C32] to-[#C98A4B] p-12 text-[#FBF6EF] flex-col justify-between overflow-hidden">
        {/* Decorative texture */}
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#FBC78A]/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={22} className="text-[#FBC78A]" />
            <span className="text-sm font-semibold tracking-widest uppercase text-[#FBC78A]">
              AI Resume Builder
            </span>
          </div>

          <h1 className="text-4xl font-bold font-serif mt-4 leading-tight">
            Welcome back to
            <br />
            your story.
          </h1>

          <p className="mt-4 text-[#F3DCC2] max-w-sm">
            Sign in to keep building ATS-optimized resumes with AI,
            picking up right where you left off.
          </p>
        </div>

        <div className="relative z-10 border-t border-[#FBC78A]/25 pt-6">
          <h2 className="text-2xl font-bold font-serif">
            Build Your Professional Resume
          </h2>

          <p className="mt-3 text-[#F3DCC2] max-w-sm">
            Generate summaries, skills, experiences, and ATS reports
            instantly, no guesswork required.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl border border-[#E8DCC8] shadow-[0_20px_60px_-15px_rgba(140,74,47,0.25)] p-8">
          <div className="flex items-center gap-2 lg:hidden mb-4 text-[#A85C32]">
            <Sparkles size={20} />
            <span className="text-xs font-semibold tracking-widest uppercase">
              AI Resume Builder
            </span>
          </div>

          <h2 className="text-3xl font-bold font-serif text-[#3D2B1F]">
            Welcome back
          </h2>

          <p className="text-[#8A7763] mt-2">
            Log in to continue building your resume.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-[#3D2B1F]">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B89B7D]"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl text-[#3D2B1F] placeholder:text-[#B89B7D] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
                />
              </div>

              {errors.email && (
                <p className="text-[#B3463F] text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#3D2B1F]">
                  Password
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#A85C32] font-medium hover:text-[#8C4A2F]"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B89B7D]"
                />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Minimum 6 characters required",
                    },
                  })}
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl text-[#3D2B1F] placeholder:text-[#B89B7D] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
                />
              </div>

              {errors.password && (
                <p className="text-[#B3463F] text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-[#A85C32] hover:bg-[#8C4A2F] disabled:opacity-60 text-[#FFFDF9] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-[0_8px_20px_-6px_rgba(140,74,47,0.5)]"
            >
              {isSubmitting ? "Logging in..." : "Login"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-[#8A7763]">
            Don&apos;t have an account?
            <Link
              href="/auth/register"
              className="ml-2 text-[#A85C32] font-semibold hover:text-[#8C4A2F]"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}