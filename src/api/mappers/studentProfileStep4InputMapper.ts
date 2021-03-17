import { IStudentProfileInputStep4 } from "@/api/models/types";
import { StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";

export function studentProfileStep4InputMapper(
  studentProfileForm: StudentProfileStep4Form
): IStudentProfileInputStep4 {
  return {
    skills: studentProfileForm.skills.map(skill => {
      return { id: skill.id };
    }),
    languages: studentProfileForm.languages.map(selectedLanguage => {
      return {
        language: selectedLanguage.language.id,
        languageLevel: selectedLanguage.level.id,
      };
    }),
    distinction: studentProfileForm.distinction,
    onlineProjects: studentProfileForm.onlineProjects,
    hobbies: studentProfileForm.hobbies,
  };
}
