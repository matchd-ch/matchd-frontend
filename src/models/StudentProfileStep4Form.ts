import { LanguageType, LevelType, SkillType } from "api";

export interface SelectedLanguage {
  language: LanguageType;
  level: LevelType;
}

export interface StudentProfileStep4Form {
  skills: SkillType[];
  distinction: string;
  hobbies: string[];
  languages: SelectedLanguage[];
}
