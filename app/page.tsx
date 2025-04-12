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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-center sm:text-left leading-tight">
          Tailor your resume to any job in seconds
        </h1>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">AI-Powered Rewriting</h3>
              <p className="text-sm text-muted-foreground">
                Get your resume optimized with industry-specific keywords
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Professional Formatting</h3>
              <p className="text-sm text-muted-foreground">
                Clean, ATS-friendly layouts that get noticed
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckIcon className="w-5 h-5 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold">Instant Adaptations</h3>
              <p className="text-sm text-muted-foreground">
                Tailor your resume for any job in under 30 seconds
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-transparent"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full rounded-full bg-foreground text-background px-6 py-3 font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {state.submitting ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
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
