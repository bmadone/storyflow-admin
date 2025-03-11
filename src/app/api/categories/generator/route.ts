import { NextResponse } from "next/server";
import { GeneratorRequest } from "@/shared/types";
import { generateAudio } from "./audio-generator";
import { generateImage } from "./image-generator";
import { generateStories } from "./stories-generator";
import { generateQuiz } from "./quiz-generator";

async function generate(body: GeneratorRequest) {
  const stories = await generateStories(
    body.title,
    body.topics,
    body.level,
    body.numberOfStories
  );

  return await Promise.all(
    stories.map(async (story) => {
      const [imageUrl, audioUrl] = await Promise.all([
        body.includeImage ? generateImage(story) : null,
        body.includeAudio ? generateAudio(story) : null,
      ]);

      return { story, imageUrl, audioUrl };
    })
  );
}

export async function POST(request: Request) {
  try {
    const body: GeneratorRequest = await request.json();
    const stories = await generate(body);
    console.log("stories", stories);

    for (const story of stories) {
      const quiz = await generateQuiz(story.story, body.level);
      console.log("quiz", quiz);
    }
  } catch (error) {
    console.error("Error generating category:", error);
    return NextResponse.json(
      { error: "Failed to generate category" },
      { status: 500 }
    );
  }
}
