import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { Project, Profile, Skill } from "../types";

interface AppState {
  projects: Project[];
  profile: Profile | null;
  skills: Skill[];
}

type AppAction =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "SET_PROFILE"; payload: Profile }
  | { type: "SET_SKILLS"; payload: Skill[] };

const initialState: AppState = {
  projects: [],
  profile: null,
  skills: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "SET_PROFILE":
      return { ...state, profile: action.payload };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
