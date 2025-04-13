import { TailoredResumeSpec } from "@/types/model";

export const fetchParsedResume = async (formData: any) => {
  const parseResponse = await fetch("/api/parse-resume", {
    method: "POST",
    body: formData,
  });

  if (!parseResponse.ok) {
    const errorData = await parseResponse.json();
    throw new Error(errorData.error ?? "Failed to parse resume");
  }

  const parsedData = await parseResponse.json();
  return parsedData;
};

export const tailoredResume = async ({
  parsedResume,
  jobDescription,
}: TailoredResumeSpec) => {
  const keywords = await extractJobDescription(jobDescription);

  const tailorResponse = await fetch("/api/tailor-resume", {
    method: "POST",
    body: JSON.stringify({
      parsedResume: parsedResume,
      jobDescription: jobDescription.trim(),
      keywords: keywords,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!tailorResponse.ok) {
    const errorData = await tailorResponse.json();
    throw new Error(errorData.error || "Failed to tailor resume");
  }

  const tailoredData = await tailorResponse.json();
  return tailoredData;
};

export const extractJobDescription = async (text: string) => {
  const keywordResponse = await fetch("/api/extract-jobdescription", {
    method: "POST",
    body: JSON.stringify({ text: text.trim() }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!keywordResponse.ok) {
    const errorData = await keywordResponse.json();
    throw new Error(errorData.error || "Failed to extract keywords");
  }

  const keywords = await keywordResponse.json();
  return keywords;
};
