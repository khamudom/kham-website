import { NextResponse } from "next/server";
import aboutData from "@/data/about.json";

export async function GET() {
  try {
    return NextResponse.json(aboutData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  }
}
