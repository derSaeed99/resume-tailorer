"use client";

import { useForm, ValidationError } from "@formspree/react";
import { toast } from "sonner";
import Image from "next/image";

export default function Home() {
  const [state, handleSubmit] = useForm("mrbpjqpe");

  if (state.succeeded) {
    toast.success("You've been added to the waitlist!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Your Dream Job, Tailored Resume
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Upload your resume, paste the job description, and get a perfectly
            tailored resume in seconds.
          </p>
        </div>

        <div className="mb-8 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Be the first to try it out!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:ring-2 focus:ring-purple-400 focus:outline-none placeholder-gray-400"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {state.submitting ? "Submitting..." : "Join Waitlist"}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">⚡ Instant Optimization</h3>
            <p className="text-gray-300">
              Our AI analyzes the job description and optimizes your resume with
              the right keywords.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">📄 Any Format, Anywhere</h3>
            <p className="text-gray-300">
              Upload PDF, DOC, or TXT. We'll handle the rest and give you a
              polished, ATS-friendly resume.
            </p>
          </div>
          <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4">
              🎯 Job-Specific Tailoring
            </h3>
            <p className="text-gray-300">
              Get a unique resume for each application, highlighting the most
              relevant skills and experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
