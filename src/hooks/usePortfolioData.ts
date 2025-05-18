import { useState, useEffect } from "react";
import { ApiResponse } from "../types/portfolio";
import * as api from "../utils/api";

export function useProfile() {
  const [state, setState] = useState<ApiResponse<any>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await api.fetchProfile();
      setState(result);
    };
    loadData();
  }, []);

  return state;
}

export function useProjects() {
  const [state, setState] = useState<ApiResponse<any>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await api.fetchProjects();
      setState(result);
    };
    loadData();
  }, []);

  return state;
}

export function useExperience() {
  const [state, setState] = useState<ApiResponse<any>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await api.fetchExperience();
      setState(result);
    };
    loadData();
  }, []);

  return state;
}

export function useSkills() {
  const [state, setState] = useState<ApiResponse<any>>({
    data: null,
    loading: true,
  });

  useEffect(() => {
    const loadData = async () => {
      const result = await api.fetchSkills();
      setState(result);
    };
    loadData();
  }, []);

  return state;
}
