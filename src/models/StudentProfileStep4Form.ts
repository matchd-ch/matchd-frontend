import {
  DistinctionInputType,
  HobbyInputType,
  LanguageType,
  LevelType,
  OnlineProjectInputType,
  SkillType,
} from "api";

export interface SelectedLanguage {
  language: LanguageType;
  level: LevelType;
}

export interface StudentProfileStep4Form {
  skills: SkillType[];
  languages: SelectedLanguage[];
  distinctions: DistinctionInputType[];
  onlineProjects: OnlineProjectInputType[];
  hobbies: HobbyInputType[];
}
