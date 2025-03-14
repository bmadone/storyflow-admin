import { Level } from "@/shared/types";

export async function generateStories(
  title: string,
  topics: string[],
  level: Level,
  numberOfStories: number
): Promise<string[]> {
  const separator = "---";

  const result = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates stories about a given topic that help users learn language using Teaching Proficiency through Reading and Storytelling. Return stories in a numbered list format, with each story starting with a number followed by a period (e.g. '1.', '2.', etc.)",
        },
        {
          role: "user",
          content: `Generate ${numberOfStories} stories for level ${level} with title ${title} about the topics: ${topics.join(
            ", "
          )} each story should be separated with ${separator}, and contain only text, without any formatting, or numbers`,
        },
      ],
    }),
  });

  const data = await result.json();
  const content = data.choices[0].message.content;

  const stories = content.split(separator).map((story: string) => story.trim());
  return stories;
}
