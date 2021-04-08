import { RootState } from "@/store";
import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  JobRequirement,
  JobType,
  Language,
  LanguageLevel,
  Skill,
  SoftSkill,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export interface SearchNode {
  id: string;
  main: boolean;
  name: string;
  img: string;
  score: number;
  fx?: number;
  fy?: number;
}

export interface SearchLink {
  source: string;
  target: string;
  value: number;
}

export type Getters = {
  benefits(state: State): Benefit[];
  branches(state: State): Branch[];
  company(state: State): { data: Company | null; logo: Attachment | null; media: Attachment[] };
  culturalFits(state: State): CulturalFit[];
  jobRequirements(state: State): JobRequirement[];
  jobTypes(state: State): JobType[];
  languages(state: State): Language[];
  languageLevels(state: State): LanguageLevel[];
  matches(state: State): { nodes: SearchNode[]; links: SearchLink[] };
  skills(state: State): Skill[];
  softSkills(state: State): SoftSkill[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  benefits(state: State): Benefit[] {
    return state.benefits.data;
  },
  branches(state: State): Branch[] {
    return state.branches.data;
  },
  company(state: State): { data: Company | null; logo: Attachment | null; media: Attachment[] } {
    return state.company;
  },
  culturalFits(state: State): CulturalFit[] {
    return state.culturalFits.data;
  },
  jobRequirements(state: State): JobRequirement[] {
    return state.jobRequirements.data;
  },
  jobTypes(state: State): JobType[] {
    return state.jobTypes.data;
  },
  languages(state: State): Language[] {
    return state.languages.data;
  },
  languageLevels(state: State): LanguageLevel[] {
    return state.languages.levels;
  },
  matches(state: State): { nodes: SearchNode[]; links: SearchLink[] } {
    return {
      nodes: [
        {
          id: "root",
          main: true,
          name: "A",
          fx: 300,
          fy: 300,
          img: "",
          score: 0,
        },
        ...state.matches.data.map((match) => {
          return {
            id: match.slug,
            name: match.name,
            img: match.avatar || "",
            main: false,
            score: match.score,
          };
        }),
      ],
      links: state.matches.data.map((match) => {
        return {
          source: "root",
          target: match.slug,
          value: match.score,
        };
      }),
    };
  },
  skills(state: State): Skill[] {
    return state.skills.data;
  },
  softSkills(state: State): SoftSkill[] {
    return state.softSkills.data;
  },
};
