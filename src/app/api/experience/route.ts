import { NextResponse } from "next/server";
import experienceData from "@/data/experience.json";

export async function GET() {
  try {
    return NextResponse.json(experienceData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experience data" },
      { status: 500 }
    );
  }
}
