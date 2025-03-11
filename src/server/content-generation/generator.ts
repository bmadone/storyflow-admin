import { Level, Question } from "@/shared/types";
import { generateAudio } from "./audio-generator";
import { generateImage } from "./image-generator";
import { generateQuiz } from "./quiz-generator";
import { generateStories } from "./stories-generator";

export interface ContentGenerationCriteria {
  title: string;
  topics: string[];
  level: Level;
  numberOfStories: number;
  includeImage: boolean;
  includeAudio: boolean;
  numberOfQuizzes: number;
}

export interface GeneratedContent {
  story: string;
  image: string | null;
  audio: string | null;
  quizes: Question[];
}

export async function generate(
  criteria: ContentGenerationCriteria
): Promise<GeneratedContent[]> {
  const stories = await generateStories(
    criteria.title,
    criteria.topics,
    criteria.level,
    criteria.numberOfStories
  );

  const data: GeneratedContent[] = [];
  for (const story of stories) {
    const [quizes, image, audio] = await Promise.all([
      criteria.numberOfQuizzes > 0
        ? await generateQuiz(story, criteria.numberOfQuizzes)
        : [],
      criteria.includeImage ? await generateImage(criteria.topics) : null,
      criteria.includeAudio ? await generateAudio(story) : null,
    ]);

    data.push({ story, quizes, image, audio });
  }

  return data;
}
