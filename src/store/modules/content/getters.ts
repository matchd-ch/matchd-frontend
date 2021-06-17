import {
  CompanyDashboard,
  GroupedJobPostingMatching,
  GroupedProjectPostingMatching,
} from "@/models/CompanyDashboard";
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
  JobPostingMatchInfo,
  JobRequirement,
  JobType,
  Keyword,
  Language,
  LanguageLevel,
  Match,
  ProjectPostingMatchInfo,
  ProjectPosting,
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
  companyDashboard(state: State): CompanyDashboard | null;
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
  projectPostingDetail(
    state: State
  ): {
    data: ProjectPosting | null;
    images: Attachment[];
    imageFallback: Attachment | null;
    documents: Attachment[];
  };
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
  companyDashboard(state: State): CompanyDashboard | null {
    if (!state.dashboard.data) {
      return null;
    }

    function jobPostingReducer(r: GroupedJobPostingMatching[], a: JobPostingMatchInfo) {
      const existingJobPosting = r.find(
        (groupedJobPosting) => groupedJobPosting.jobPosting.id === a.jobPosting.id
      );
      if (!existingJobPosting) {
        r.push({ jobPosting: a.jobPosting, students: [a.student] });
      } else {
        existingJobPosting.students.push(a.student);
      }
      return r;
    }
    function projectPostingReducer(r: GroupedProjectPostingMatching[], a: ProjectPostingMatchInfo) {
      const existingProjectPosting = r.find(
        (groupedJobPosting) => groupedJobPosting.projectPosting.id === a.projectPosting.id
      );
      if (!existingProjectPosting) {
        r.push({ projectPosting: a.projectPosting, ...(a.student && { students: [a.student] }) });
      } else if (existingProjectPosting.students && a.student) {
        existingProjectPosting.students.push(a.student);
      }
      return r;
    }

    return {
      ...state.dashboard.data,
      uniqueUnconfirmedJobPostingMatchings: state.dashboard.data.unconfirmedMatches?.reduce(
        jobPostingReducer,
        []
      ),
      uniqueRequestedJobPostingMatchings: state.dashboard.data.requestedMatches?.reduce(
        jobPostingReducer,
        []
      ),
      uniqueJobPostingMatchings: state.dashboard.data.confirmedMatches?.reduce(
        jobPostingReducer,
        []
      ),
      uniqueProjectPostingMatchings: state.dashboard.data.projectMatches?.reduce(
        projectPostingReducer,
        []
      ),
    };
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
            jobPostingTitle: match.title,
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
        jobPostingTitle: match.title,
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
  projectPostingDetail(
    state: State
  ): {
    data: ProjectPosting | null;
    images: Attachment[];
    imageFallback: Attachment | null;
    documents: Attachment[];
  } {
    return state.projectPosting;
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
