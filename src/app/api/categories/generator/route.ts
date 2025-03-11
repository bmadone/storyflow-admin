import { NextResponse } from "next/server";
import { GeneratorRequest } from "@/shared/types";
import { generate } from "@/server/content-generation";

export async function POST(request: Request) {
  try {
    const body: GeneratorRequest = await request.json();
    const generatedContent = await generate(body);

    return NextResponse.json({
      success: true,
      message: "Category generated successfully",
      data: generatedContent,
    });
  } catch (error) {
    console.error("Error generating category:", error);
    return NextResponse.json(
      { error: "Failed to generate category" },
      { status: 500 }
    );
  }
}
