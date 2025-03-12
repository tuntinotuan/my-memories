import { NextResponse } from "next/server";

export async function GET() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Missing Unsplash API key" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}`,
      { cache: "no-store" } // Prevent caching issues
    );

    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
