import { NextResponse } from "next/server";
import projectsData from "@/data/projects.json";

export async function GET() {
  try {
    const visibleProjects = {
      ...projectsData,
      data: projectsData.data.filter((project) => !project.hidden),
    };
    return NextResponse.json(visibleProjects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects data" },
      { status: 500 }
    );
  }
}
