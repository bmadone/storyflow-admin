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
