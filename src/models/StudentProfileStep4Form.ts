import type { HobbyInput, Language, LanguageLevel, OnlineProjectInput } from "@/api/models/types";

export interface SelectedLanguage {
  language: Language;
  level: LanguageLevel;
}

export interface StudentProfileStep4Form {
  skills: string[];
  languages: SelectedLanguage[];
  distinction: string;
  onlineProjects: OnlineProjectInput[];
  hobbies: HobbyInput[];
}
