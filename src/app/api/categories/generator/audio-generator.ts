import { ElevenLabsClient } from "elevenlabs";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY,
});

// Using Sarah voice as default - one of the most natural-sounding voices
const VOICE_NAME = "Sarah";

// Using the latest multilingual model for best quality and language support
const MODEL_ID = "eleven_multilingual_v2";

export async function generateAudio(story: string): Promise<string | null> {
  try {
    if (!process.env.ELEVEN_LABS_API_KEY) {
      console.error("ELEVEN_LABS_API_KEY is not set");
      return null;
    }

    // Generate audio using ElevenLabs API
    const audioData = await elevenlabs.generate({
      text: story,
      voice: VOICE_NAME,
      model_id: MODEL_ID,
    });

    // Convert the audio stream to a buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of audioData) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Convert to base64 and create data URL
    const base64Audio = buffer.toString("base64");
    const dataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return dataUrl;
  } catch (error) {
    console.error("Error generating audio:", error);
    return null;
  }
}
