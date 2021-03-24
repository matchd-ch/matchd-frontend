import { HobbyInput, Language, LanguageLevel, OnlineProjectInput, Skill } from "api";

export interface SelectedLanguage {
  language: Language;
  level: LanguageLevel;
}

export interface StudentProfileStep4Form {
  skills: Skill[];
  languages: SelectedLanguage[];
  distinction: string;
  onlineProjects: OnlineProjectInput[];
  hobbies: HobbyInput[];
}
