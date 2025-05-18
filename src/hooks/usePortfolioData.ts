import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useApi } from "./useApi";
import { fetchProfile, fetchProjects, fetchSkills } from "@/utils/api";

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
      dispatch({ type: "SET_SKILLS", payload: skillsResponse.data.data });
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
