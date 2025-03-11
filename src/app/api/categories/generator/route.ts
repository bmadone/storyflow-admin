import { NextResponse } from "next/server";

type QuizType = "multiple-choice" | "yes-no";

interface GeneratorRequest {
  topics: string;
  numberOfStories: number;
  numberOfQuizzes: number;
  quizTypes: QuizType[];
  level: string;
  includeAudio: boolean;
  includeImage: boolean;
}

export async function POST(request: Request) {
  try {
    const body: GeneratorRequest = await request.json();

    // TODO: Implement actual generation logic
    // For now, just return the received data
    const generatedCategory = {
      id: Date.now().toString(),
      title: body.topics.split(",")[0].trim(),
      stories: Array(body.numberOfStories).fill({
        title: "Sample Story",
        content: "Story content will be generated here",
      }),
      quizzes: Array(body.numberOfQuizzes).fill({
        type: body.quizTypes[0],
        questions: ["Sample question"],
      }),
      level: body.level,
      hasAudio: body.includeAudio,
      hasImage: body.includeImage,
    };

    return NextResponse.json(generatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate category" },
      { status: 500 }
    );
  }
}
