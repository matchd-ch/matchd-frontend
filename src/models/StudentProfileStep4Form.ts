import { HobbyInputType, LanguageType, LevelType, OnlineProjectInputType, SkillType } from "api";

export interface SelectedLanguage {
  language: LanguageType;
  level: LevelType;
}

export interface StudentProfileStep4Form {
  skills: SkillType[];
  languages: SelectedLanguage[];
  distinction: string;
  onlineProjects: OnlineProjectInputType[];
  hobbies: HobbyInputType[];
}
