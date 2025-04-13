import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { parsedResume, jobDescription } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a professional resume writer. Tailor the following resume to match the job description. Follow these guidelines:
    1. Analyze the job description and identify key skills, qualifications, and requirements
    2. Review the resume and identify relevant experiences and skills
    3. Modify the resume to:
    - Highlight relevant experiences that match the job requirements
    - Include keywords from the job description
    - Maintain a professional tone and format
    4. Ensure the tailored resume is well-organized and easy to read
    5. Keep the length appropriate for the position level
    6. Do not make up information or experiences that aren't in the original resume

    Resume:
    ${JSON.stringify(parsedResume)}

    Job Description:
    ${jobDescription}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tailoredResume = response.text();

    return NextResponse.json({ tailoredResume });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to tailor resume" },
      { status: 500 }
    );
  }
}
