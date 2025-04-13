import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY!);

interface JobDescriptionResponse {
  company_info: {
    name: string;
    location: string;
    website: string;
  };
  contact_info: {
    email: string;
    phone: string;
    contact_person: string;
  };
  job_details: {
    expiration_date: string;
  };
  technical_skills: string[];
  soft_skills: string[];
  certifications: string[];
  tools_technologies: string[];
  industry_terms: string[];
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string") {
      throw new Error("Invalid text format");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze the following job description and extract structured information. Return the results as a JSON object with the following format:
    {
        "company_info": {
            "name": "",
            "location": "",
            "website": ""
        },
        "contact_info": {
            "email": "",
            "phone": "",
            "contact_person": ""
        },
        "job_details": {
            "expiration_date": ""
        },
        "technical_skills": [],
        "soft_skills": [],
        "certifications": [],
        "tools_technologies": [],
        "industry_terms": []
    }
    
    Guidelines:
    - Company info: Extract company name, location, and website if available
    - Contact info: Extract email, phone number, and contact person if available
    - Job details: Extract expiration date if available (format: YYYY-MM-DD)
    - Technical skills: Programming languages, frameworks, technical expertise
    - Soft skills: Communication, teamwork, leadership abilities
    - Certifications: Official certifications or qualifications
    - Tools and technologies: Software, hardware, platforms used
    - Industry-specific terms: Jargon or terms specific to the industry
    
    Job Description:
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (!response.text()) {
      throw new Error("No response from AI model");
    }
    const keywords = response.text();
    return NextResponse.json(keywords);
  } catch (error) {
    console.error("Error extracting keywords:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to extract keywords",
      },
      { status: 500 }
    );
  }
}
