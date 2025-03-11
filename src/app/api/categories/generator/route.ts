import { NextResponse } from "next/server";
import { GeneratorRequest } from "@/shared/types";
import { generateStories } from "./stories-generator";
import { generateQuiz } from "./quiz-generator";

async function generate(body: GeneratorRequest): Promise<string[]> {
  const stories = await generateStories(
    body.title,
    body.topics,
    body.level,
    body.numberOfStories
  );

  return stories;
}

export async function POST(request: Request) {
  try {
    const body: GeneratorRequest = await request.json();
    const stories = await generate(body);

    const result = [];
    for (const story of stories) {
      const quiz = await generateQuiz(story, body.numberOfQuizzes);
      result.push({ story, quiz });
    }
    console.log("result", result);

    return NextResponse.json({
      success: true,
      message: "Category generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error generating category:", error);
    return NextResponse.json(
      { error: "Failed to generate category" },
      { status: 500 }
    );
  }
}
