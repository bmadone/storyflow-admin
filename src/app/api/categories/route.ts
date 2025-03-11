import { NextResponse } from "next/server";

interface Category {
  id: string;
  title: string;
}

// Stub data
const categories: Category[] = [
  { id: "1", title: "Family" },
  { id: "2", title: "Hobby" },
  { id: "3", title: "Weather" },
];

export async function GET() {
  return NextResponse.json(categories);
}
