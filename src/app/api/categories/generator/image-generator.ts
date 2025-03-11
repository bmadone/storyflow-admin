import OpenAI from "openai";

const openai = new OpenAI();

export async function generateImage(story: string): Promise<string | null> {
  try {
    const prompt = `create image that summarize ${story}, would be used in e-learning app as a cover for the story`;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    const data = response.data[0].url;
    return data || null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
