import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const resume = formData.get("resume");

    if (!resume || typeof resume !== "string") {
      throw new Error("Invalid resume format");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Parse the following resume into structured JSON format. Extract the following sections:
    - personalInfo: { name, email, phone, location, linkedin, portfolio }
    - workExperience: [{ company, position, startDate, endDate, description }]
    - education: [{ institution, degree, fieldOfStudy, startDate, endDate }]
    - skills: string[]
    - certifications: string[]
    - projects: [{ name, description, technologies }]

    Resume:
    ${resume}`;

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (!response.text()) {
      throw new Error("No response from AI model");
    }

    const parsedResume = response.text();
    return NextResponse.json(parsedResume);
  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to parse resume",
      },
      { status: 500 }
    );
  }
}
