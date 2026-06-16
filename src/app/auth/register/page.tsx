"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, Sparkles, User } from "lucide-react";
import { registerApi } from "@/apis/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
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
            Craft a resume that
            <br />
            opens doors.
          </h1>

          <p className="mt-4 text-[#F3DCC2] max-w-sm">
            Create ATS-optimized resumes with AI, built around your
            story, polished for hiring managers.
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
            Create your account
          </h2>

          <p className="text-[#8A7763] mt-2">
            Start building your resume in minutes.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-[#3D2B1F]">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B89B7D]"
                />

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl text-[#3D2B1F] placeholder:text-[#B89B7D] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
                />
              </div>

              {errors.name && (
                <p className="text-[#B3463F] text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
              <label className="block mb-2 text-sm font-medium text-[#3D2B1F]">
                Password
              </label>

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
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-[#8A7763]">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-2 text-[#A85C32] font-semibold hover:text-[#8C4A2F]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}