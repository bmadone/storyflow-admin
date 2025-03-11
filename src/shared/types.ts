export type Level = "A1" | "A2";

export type QuizType = "multiple-choice";

export interface GeneratorRequest {
  title: string;
  topics: string[];
  numberOfStories: number;
  numberOfQuizzes: number;
  quizTypes: QuizType[];
  level: Level;
  includeAudio: boolean;
  includeImage: boolean;
}

export interface Story {
  story: string;
  image: string | null;
  audio: string | null;
  quizes: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice";
  options: string[];
  correctAnswer: string;
  successMessage: string;
  failMessage: string;
}
