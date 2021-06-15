import { SearchResult } from "@/models/SearchResult";
import { SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import { RootState } from "@/store";
import type {
  Attachment,
  Benefit,
  Branch,
  Company,
  CulturalFit,
  Dashboard,
  JobPosting,
  JobRequirement,
  JobType,
  Keyword,
  Language,
  LanguageLevel,
  Match,
  ProjectType,
  Skill,
  SoftSkill,
  Student,
  Topic,
  ZipCity,
} from "api";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  benefits(state: State): Benefit[];
  branches(state: State): Branch[];
  companyMatching(state: State): { data: Match[] };
  company(
    state: State
  ): {
    data: Company | null;
    logo: Attachment | null;
    logoFallback: Attachment | null;
    media: Attachment[];
  };
  culturalFits(state: State): CulturalFit[];
  dashboard(state: State): Dashboard | null;
  jobPostingDetail(state: State): JobPosting | null;
  jobPostings(state: State): JobPosting[];
  jobRequirements(state: State): JobRequirement[];
  jobTypes(state: State): JobType[];
  languages(state: State): Language[];
  keywords(state: State): Keyword[];
  languageLevels(state: State): LanguageLevel[];
  matchesForBubbles(state: State): SearchResultBubbleData;
  matchesForGrid(state: State): SearchResult[];
  matchLoading(state: State): boolean;
  projectTypes(state: State): ProjectType[];
  skills(state: State): Skill[];
  softSkills(state: State): SoftSkill[];
  student(
    state: State
  ): {
    data: Student | null;
    avatar: Attachment | null;
    avatarFallback: Attachment | null;
    certificates: Attachment[];
  };
  topics(state: State): Topic[];
  zipCityJobs(state: State): ZipCity[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  benefits(state: State): Benefit[] {
    return state.benefits.data;
  },
  branches(state: State): Branch[] {
    return state.branches.data;
  },
  company(
    state: State
  ): {
    data: Company | null;
    logo: Attachment | null;
    logoFallback: Attachment | null;
    media: Attachment[];
  } {
    return state.company;
  },
  companyMatching(state: State): { data: Match[] } {
    return state.companyMatching;
  },
  culturalFits(state: State): CulturalFit[] {
    return state.culturalFits.data;
  },
  dashboard(state: State): Dashboard | null {
    return state.dashboard.data;
  },
  jobPostingDetail(state: State): JobPosting | null {
    return state.jobPosting.data;
  },
  jobPostings(state: State): JobPosting[] {
    return state.jobPostings.data;
  },
  jobRequirements(state: State): JobRequirement[] {
    return state.jobRequirements.data;
  },
  jobTypes(state: State): JobType[] {
    return state.jobTypes.data;
  },
  keywords(state: State): Keyword[] {
    return state.keywords.data;
  },
  languages(state: State): Language[] {
    return state.languages.data;
  },
  languageLevels(state: State): LanguageLevel[] {
    return state.languages.levels;
  },
  matchesForBubbles(state: State): SearchResultBubbleData {
    return {
      nodes: [
        {
          id: "root",
          main: true,
          name: "Root",
          img: "",
          score: 0,
          rawScore: 0,
        },
        ...state.matches.data.map((match) => {
          return {
            id: match.slug,
            name: match.name,
            title: match.title,
            img: match.avatar || "",
            main: false,
            score: match.score,
            rawScore: match.rawScore,
            matchStatus: {
              ...match.matchStatus,
            },
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
  matchesForGrid(state: State): SearchResult[] {
    return state.matches.data.map((match) => {
      return {
        id: match.slug,
        name: match.name,
        title: match.title,
        img: match.avatar || "",
        score: match.score,
        rawScore: match.rawScore,
        matchStatus: {
          ...match.matchStatus,
        },
      };
    });
  },
  matchLoading(state: State): boolean {
    return state.match.loading;
  },
  projectTypes(state: State): ProjectType[] {
    return state.projectTypes.data;
  },
  skills(state: State): Skill[] {
    return state.skills.data;
  },
  softSkills(state: State): SoftSkill[] {
    return state.softSkills.data;
  },
  student(
    state: State
  ): {
    data: Student | null;
    avatar: Attachment | null;
    avatarFallback: Attachment | null;
    certificates: Attachment[];
  } {
    return state.student;
  },
  topics(state: State): Topic[] {
    return state.topics.data;
  },
  zipCityJobs(state: State): ZipCity[] {
    return state.matches.zipCityJobs;
  },
};
