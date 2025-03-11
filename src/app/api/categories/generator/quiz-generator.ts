import { Level } from "@/shared/types";

interface Question {
  id: string;
  text: string;
  type: "multiple-choice";
  options: string[];
  correctAnswer: string;
  successMessage: string;
  failMessage: string;
}

export async function generateQuiz(
  text: string,
  level: Level
): Promise<Question[]> {
  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that generates language learning quizzes using Teaching Proficiency through Reading and Storytelling (TPRS) method. 
					Generate questions suitable for ${level} level learners.
					Each question should:
					- Be clear and straightforward
					- Have 4 options (A, B, C, D)
					- Include success and fail messages that are encouraging and educational`,
        },
        {
          role: "user",
          content: `Generate a quiz for the following text: "${text}". 
					Format the response as a JSON array of objects with the following structure:
					{
						"id": "unique-string",
						"text": "question text",
						"type": "multiple-choice",
						"options": ["option1", "option2", "option3", "option4"],
						"correctAnswer": "option2",
						"successMessage": "Correct! [explanation]",
						"failMessage": "Not exactly, [correction]"
					}`,
        },
      ],
    }),
  });

  const data = await result.json();
  return JSON.parse(data.choices[0].message.content);
}
