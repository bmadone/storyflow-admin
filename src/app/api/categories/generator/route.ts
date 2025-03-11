import { NextResponse } from "next/server";
import { GeneratorRequest, Story } from "@/shared/types";
import { generateStories } from "./stories-generator";
import { generateQuiz } from "./quiz-generator";
import { generateImage } from "./image-generator";
import { generateAudio } from "./audio-generator";

async function generate(body: GeneratorRequest): Promise<Story[]> {
  const stories = await generateStories(
    body.title,
    body.topics,
    body.level,
    body.numberOfStories
  );

  const data: Story[] = [];
  for (const story of stories) {
    Promise.all([
      body.includeImage ? await generateImage(body.topics.join(", ")) : null,
      body.includeAudio ? await generateAudio(story) : null,
      body.numberOfQuizzes > 0
        ? await generateQuiz(story, body.numberOfQuizzes)
        : [],
    ]).then(([image, audio, quizes]) => {
      data.push({ story, image, audio, quizes });
    });
  }

  return data;
}

export async function POST(request: Request) {
  try {
    const body: GeneratorRequest = await request.json();
    const stories = await generate(body);

    return NextResponse.json({
      success: true,
      message: "Category generated successfully",
      data: stories,
    });
  } catch (error) {
    console.error("Error generating category:", error);
    return NextResponse.json(
      { error: "Failed to generate category" },
      { status: 500 }
    );
  }
}
