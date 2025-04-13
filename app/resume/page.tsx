"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import Link from "next/link";
import { fetchParsedResume, tailoredResume as tailored } from "../api/apiCalls";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { FileUpload } from "../../components/ui/file-upload";
import { Typography } from "../../components/ui/typography";
import { ParsedResumeSpec } from "../../types/model";

export default function ResumePage() {
  const { isSignedIn, user } = useUser();
  const [resume, setResume] = useState<File | string>("");
  const [jobDescription, setJobDescription] = useState<string | null>("");
  const [tailoredResume, setTailoredResume] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [parsedResume, setParsedResume] = useState<ParsedResumeSpec | null>(
    null
  );
  const [selectedTheme, setSelectedTheme] = useState<string>("default");

  useEffect(() => {
    if (resume) {
      const fetchResume = async () => {
        setIsProcessing(true);
        try {
          const formData = new FormData();
          formData.append(
            "resume",
            typeof resume === "string" ? resume.trim() : resume
          );
          formData.append("userId", user?.id || "");
          formData.append(
            "instructions",
            `You are a professional resume writer. Your task is to tailor the provided resume to match the job description. Follow these steps:
        1. Analyze the job description and identify key skills, qualifications, and requirements
        2. Review the resume and identify relevant experiences and skills
        3. Modify the resume to:
        - Highlight relevant experiences that match the job requirements
        - Include keywords from the job description
        - Maintain a professional tone and format
        4. Ensure the tailored resume is well-organized and easy to read
        5. Keep the length appropriate for the position level
        6. Do not make up information or experiences that aren't in the original resume`
          );
          console.log(formData);
          const parsedData = await fetchParsedResume(formData);
          setParsedResume(parsedData);
        } catch (error) {
          console.error("Error:", error);
          toast.error(
            error instanceof Error ? error.message : "An error occurred"
          );
        } finally {
          setIsProcessing(false);
        }
      };
      fetchResume();
    }
  }, [resume]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append(
        "resume",
        typeof resume === "string" ? resume.trim() : resume
      );

      if (!jobDescription?.trim()) {
        throw new Error("Job description is required");
      }

      formData.append("jobDescription", jobDescription.trim());
      formData.append("userId", user?.id || "");
      formData.append(
        "instructions",
        `You are a professional resume writer. Your task is to tailor the provided resume to match the job description. Follow these steps:
        1. Analyze the job description and identify key skills, qualifications, and requirements
        2. Review the resume and identify relevant experiences and skills
        3. Modify the resume to:
        - Highlight relevant experiences that match the job requirements
        - Include keywords from the job description
        - Maintain a professional tone and format
        4. Ensure the tailored resume is well-organized and easy to read
        5. Keep the length appropriate for the position level
        6. Do not make up information or experiences that aren't in the original resume`
      );
      if (parsedResume) {
        const tailoredData = await tailored({ parsedResume, jobDescription });
        setTailoredResume(tailoredData.tailoredResume);
        setUsageCount(tailoredData.usageCount);
        toast.success("Resume tailored successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!isSignedIn && (
        <div className="mb-8 p-4 bg-yellow-100 rounded">
          Please{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            sign in
          </Link>{" "}
          to use the resume tailor
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <FileUpload
            label="Upload Resume (PDF)"
            description="Supported format: .pdf"
            accept=".pdf"
            onChange={(e) => e.target.files && setResume(e.target.files[0])}
            disabled={!isSignedIn}
          />
          <Textarea
            value={typeof resume === "string" ? resume : ""}
            onChange={(e) => setResume(e.target.value)}
            className="min-h-[200px] mb-2"
            placeholder="Or paste your resume text here..."
            disabled={!isSignedIn}
          />
          <Textarea
            label="Job Description"
            value={jobDescription ?? ""}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[200px]"
            placeholder="Paste the job description here..."
            disabled={!isSignedIn}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Uses remaining: {2 - usageCount}
          </div>
          <Button
            type="submit"
            disabled={!isSignedIn || isProcessing}
            variant={"default"}
          >
            {isProcessing ? "Processing..." : "Tailor Resume"}
          </Button>
        </div>
      </form>

      {tailoredResume && (
        <div className="mt-8">
          <Typography>Tailored Resume</Typography>
          <div className="p-4 bg-gray-50 rounded">
            <pre className="whitespace-pre-wrap">
              <Typography>{tailoredResume}</Typography>
            </pre>
          </div>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => navigator.clipboard.writeText(tailoredResume)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => {
                // Implement PDF export
              }}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Export to PDF
            </button>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="default">Default Theme</option>
              <option value="modern">Modern Theme</option>
              <option value="classic">Classic Theme</option>
              <option value="creative">Creative Theme</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
