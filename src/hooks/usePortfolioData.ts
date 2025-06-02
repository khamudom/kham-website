import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useApi } from "./useApi";
import { fetchProfile, fetchProjects, fetchSkills } from "@/utils/api";
import type { Skill } from "@/types/portfolio";

export function usePortfolioData() {
  const { state, dispatch } = useAppContext();
  const {
    data: projectsResponse,
    loading: projectsLoading,
    error: projectsError,
  } = useApi(fetchProjects);
  const {
    data: profileResponse,
    loading: profileLoading,
    error: profileError,
  } = useApi(fetchProfile);
  const {
    data: skillsResponse,
    loading: skillsLoading,
    error: skillsError,
  } = useApi(fetchSkills);

  useEffect(() => {
    if (projectsResponse?.data?.data) {
      dispatch({ type: "SET_PROJECTS", payload: projectsResponse.data.data });
    }
  }, [projectsResponse, dispatch]);

  useEffect(() => {
    if (profileResponse?.data) {
      dispatch({ type: "SET_PROFILE", payload: profileResponse.data });
    }
  }, [profileResponse, dispatch]);

  useEffect(() => {
    if (skillsResponse?.data?.data) {
      const skillsRaw = skillsResponse.data.data;
      // Type guard for grouped skills object
      const isGrouped = (
        obj: any
      ): obj is { languages: Skill[]; frameworks: Skill[]; tools: Skill[] } =>
        obj &&
        typeof obj === "object" &&
        Array.isArray(obj.languages) &&
        Array.isArray(obj.frameworks) &&
        Array.isArray(obj.tools);
      if (isGrouped(skillsRaw)) {
        dispatch({
          type: "SET_SKILLS",
          payload: {
            languages: skillsRaw.languages,
            frameworks: skillsRaw.frameworks,
            tools: skillsRaw.tools,
          },
        });
      } else if (Array.isArray(skillsRaw)) {
        dispatch({
          type: "SET_SKILLS",
          payload: {
            languages: skillsRaw.filter((s) => s.category === "language"),
            frameworks: skillsRaw.filter((s) => s.category === "framework"),
            tools: skillsRaw.filter((s) => s.category === "tool"),
          },
        });
      }
    }
  }, [skillsResponse, dispatch]);

  return {
    projects: state.projects,
    profile: state.profile,
    skills: state.skills,
    loading: projectsLoading || profileLoading || skillsLoading,
    error: projectsError || profileError || skillsError,
  };
}
