import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeText, theme } = await req.json();

    // This will be implemented later when we add theme support
    return NextResponse.json({ themedResume: resumeText });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to apply theme" },
      { status: 500 }
    );
  }
}
