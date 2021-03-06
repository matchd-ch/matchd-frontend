import type {
  Benefit,
  Branch,
  Company,
  CulturalFit,
  Dashboard,
  JobPostingMatchInfo,
  JobRequirement,
  JobType,
  Keyword,
  Language,
  LanguageLevel,
  Match,
  ProjectPostingMatchInfo,
  ProjectType,
  Skill,
  SoftSkill,
  ZipCity,
} from "@/api/models/types";
import { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import { JobPostingsJobPostingFragment } from "@/api/queries/jobPostingsFragment.generated";
import { ProjectPostingsProjectPostingFragment } from "@/api/queries/projectPostingsFragment.generated";
import {
  CompanyDashboard,
  GroupedJobPostingMatching,
  GroupedProjectPostingMatching,
} from "@/models/CompanyDashboard";
import { SearchResult } from "@/models/SearchResult";
import { SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import { RootState } from "@/store";
import { GetterTree } from "vuex";
import { CompanyAttachment, State } from "./state";

export type Getters = {
  benefits(state: State): Benefit[];
  branches(state: State): Branch[];
  companyMatching(state: State): { data: Match[] };
  company(state: State): {
    data: Company | null;
    logo: CompanyAttachment | null;
    logoFallback: CompanyAttachment | null;
    media: CompanyAttachment[];
  };
  culturalFits(state: State): CulturalFit[];
  companyDashboard(state: State): CompanyDashboard | null;
  dashboard(state: State): Dashboard | null;
  jobPostingDetail(state: State): JobPostingJobPostingFragment | null;
  jobPostings(state: State): JobPostingsJobPostingFragment[];
  jobRequirements(state: State): JobRequirement[];
  jobTypes(state: State): JobType[];
  languages(state: State): Language[];
  keywords(state: State): Keyword[];
  languageLevels(state: State): LanguageLevel[];
  matchesForBubbles(state: State): SearchResultBubbleData;
  matchesForGrid(state: State): SearchResult[];
  matchLoading(state: State): boolean;
  projectPostingDetail(state: State): State["projectPosting"];
  projectPostings(state: State): ProjectPostingsProjectPostingFragment[];
  projectPostingsLoading(state: State): boolean;
  projectTypes(state: State): ProjectType[];
  skills(state: State): Skill[];
  softSkills(state: State): SoftSkill[];
  student(state: State): State["student"];
  zipCityJobs(state: State): ZipCity[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  benefits(state: State) {
    return state.benefits.data;
  },
  branches(state: State): Branch[] {
    return state.branches.data;
  },
  company(state: State): {
    data: Company | null;
    logo: CompanyAttachment | null;
    logoFallback: CompanyAttachment | null;
    media: CompanyAttachment[];
  } {
    return state.company;
  },
  companyMatching(state: State) {
    return state.companyMatching;
  },
  culturalFits(state: State) {
    return state.culturalFits.data;
  },
  companyDashboard(state: State) {
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
  dashboard(state: State) {
    return state.dashboard.data;
  },
  jobPostingDetail(state: State) {
    return state.jobPosting.data;
  },
  jobPostings(state: State) {
    return state.jobPostings.data;
  },
  jobRequirements(state: State) {
    return state.jobRequirements.data;
  },
  jobTypes(state: State) {
    return state.jobTypes.data;
  },
  keywords(state: State) {
    return state.keywords.data;
  },
  languages(state: State) {
    return state.languages.data;
  },
  languageLevels(state: State) {
    return state.languages.levels;
  },
  matchesForBubbles(state: State) {
    return {
      nodes: [
        {
          id: "root",
          main: true,
          name: "Root",
          title: "",
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
  matchesForGrid(state: State) {
    return state.matches.data.map((match) => {
      return {
        id: match.slug,
        name: match.name,
        title: match.title,
        description: match.description || "",
        keywords: match.keywords?.length
          ? match.keywords.map((keyword) => keyword?.name || "")
          : [],
        img: match.avatar || "",
        score: match.score,
        rawScore: match.rawScore,
        matchStatus: {
          ...match.matchStatus,
        },
      };
    });
  },
  matchLoading(state: State) {
    return state.match.loading;
  },
  projectPostingDetail(state: State) {
    return state.projectPosting;
  },
  projectPostings(state: State) {
    return state.projectPostings.data;
  },
  projectPostingsLoading(state: State) {
    return state.projectPostings.loading;
  },
  projectTypes(state: State) {
    return state.projectTypes.data;
  },
  skills(state: State) {
    return state.skills.data;
  },
  softSkills(state: State) {
    return state.softSkills.data;
  },
  student(state: State) {
    return state.student;
  },
  zipCityJobs(state: State) {
    return state.matches.zipCityJobs;
  },
};
