"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, FileText, Trash2, Briefcase, Sparkles } from "lucide-react";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchResumes();
  }, []);
  
  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });

      console.log(response);

      const resumeId = response.data._id;
      console.log("reached...");

      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EF]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}

        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-[#A85C32] mb-1">
              <Sparkles size={18} />
              <span className="text-xs font-semibold tracking-widest uppercase">
                AI Resume Builder
              </span>
            </div>

            <h1 className="text-4xl font-bold font-serif text-[#3D2B1F]">
              My Resumes
            </h1>

            <p className="text-[#8A7763] mt-2">
              Create ATS-friendly resumes using AI.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#A85C32] hover:bg-[#8C4A2F] text-[#FFFDF9] px-6 py-3 rounded-xl flex items-center gap-2 transition shadow-[0_8px_20px_-6px_rgba(140,74,47,0.5)]"
          >
            <Plus size={18} />
            Create Resume
          </button>
        </div>

        {/* Empty State */}

        {!loading && resumes.length === 0 && (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8DCC8] p-16 text-center shadow-[0_20px_60px_-15px_rgba(140,74,47,0.15)]">
            <FileText size={70} className="mx-auto text-[#E0C9A6]" />

            <h2 className="text-2xl font-semibold font-serif mt-6 text-[#3D2B1F]">
              No Resume Yet
            </h2>

            <p className="text-[#8A7763] mt-2">
              Create your first AI powered resume.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-6 bg-[#A85C32] hover:bg-[#8C4A2F] text-[#FFFDF9] px-6 py-3 rounded-xl transition shadow-[0_8px_20px_-6px_rgba(140,74,47,0.5)]"
            >
              Create Resume
            </button>
          </div>
        )}

        {/* Resume Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-[#FFFDF9] rounded-3xl p-6 border border-[#E8DCC8] hover:shadow-[0_20px_45px_-15px_rgba(140,74,47,0.25)] transition"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="font-bold text-xl font-serif text-[#3D2B1F]">
                    {resume.title}
                  </h2>

                  <div className="flex items-center gap-2 text-[#8A7763] mt-2">
                    <Briefcase size={16} />
                    {resume.jobTitle}
                  </div>

                  <span className="inline-block mt-4 bg-[#F3DCC2] text-[#8C4A2F] px-3 py-1 rounded-full text-sm font-medium">
                    {resume.experienceLevel}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(resume._id)}
                  className="text-[#B3463F] hover:text-[#8C2F2A] transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <button
                onClick={() => router.push(`/resume/${resume._id}`)}
                className="mt-6 w-full bg-[#3D2B1F] hover:bg-[#2A1D14] text-[#FFFDF9] py-3 rounded-xl transition"
              >
                Continue Building
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-[#3D2B1F]/50 flex items-center justify-center px-4 z-50">
          <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl p-8 border border-[#E8DCC8] shadow-[0_30px_70px_-15px_rgba(61,43,31,0.4)]">
            <h2 className="text-2xl font-bold font-serif text-[#3D2B1F] mb-6">
              Create Resume
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Resume Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl p-3 text-[#3D2B1F] placeholder:text-[#B89B7D] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
              />

              <input
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jobTitle: e.target.value,
                  })
                }
                className="w-full bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl p-3 text-[#3D2B1F] placeholder:text-[#B89B7D] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
              />

              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceLevel: e.target.value,
                  })
                }
                className="w-full bg-[#FBF6EF] border border-[#E8DCC8] rounded-xl p-3 text-[#3D2B1F] focus:ring-2 focus:ring-[#C98A4B] focus:border-[#C98A4B] outline-none transition"
              >
                <option>Fresher</option>

                <option>Junior</option>

                <option>Mid-Level</option>

                <option>Senior</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-3 border border-[#E8DCC8] text-[#3D2B1F] rounded-xl hover:bg-[#FBF6EF] transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateResume}
                className="px-5 py-3 bg-[#A85C32] hover:bg-[#8C4A2F] text-[#FFFDF9] rounded-xl transition shadow-[0_8px_20px_-6px_rgba(140,74,47,0.5)]"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}