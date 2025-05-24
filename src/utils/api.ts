import {
  Profile,
  Project,
  Experience,
  Skill,
  AboutContent,
  ContactInfo,
  ApiResponse,
  ApiResponseWithMetadata,
} from "../types/portfolio";

const BASE_URL = "/api";

async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, loading: false };
  } catch (error) {
    return {
      data: null as T,
      error: error instanceof Error ? error.message : "An error occurred",
      loading: false,
    };
  }
}

async function fetchDataWithMetadata<T>(
  endpoint: string
): Promise<ApiResponse<ApiResponseWithMetadata<T>>> {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data, loading: false };
  } catch (error) {
    return {
      data: {
        data: [],
        metadata: {
          total: 0,
          page: 1,
          limit: 10,
        },
      },
      error: error instanceof Error ? error.message : "An error occurred",
      loading: false,
    };
  }
}

export async function fetchProfile(): Promise<ApiResponse<Profile>> {
  const response = await fetchData<Profile>("profile");
  if (response.data) {
    // Normalize bio to always be a string
    const bio = Array.isArray(response.data.bio)
      ? response.data.bio.join(" ")
      : response.data.bio || "";
    response.data = { ...response.data, bio };
  }
  return response;
}

export async function fetchProjects(): Promise<
  ApiResponse<ApiResponseWithMetadata<Project>>
> {
  return fetchDataWithMetadata<Project>("projects");
}

export async function fetchExperience(): Promise<
  ApiResponse<ApiResponseWithMetadata<Experience>>
> {
  return fetchDataWithMetadata<Experience>("experience");
}

export async function fetchSkills(): Promise<
  ApiResponse<ApiResponseWithMetadata<Skill>>
> {
  return fetchDataWithMetadata<Skill>("skills");
}

export async function fetchAbout(): Promise<ApiResponse<AboutContent>> {
  return fetchData<AboutContent>("about");
}

export async function fetchContact(): Promise<ApiResponse<ContactInfo>> {
  return fetchData<ContactInfo>("contact");
}
