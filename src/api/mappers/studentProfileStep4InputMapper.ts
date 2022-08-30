import { StudentProfileAbilitiesInput } from "@/api/models/types";
import { StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";

export function studentProfileStep4InputMapper(
  studentProfileForm: StudentProfileStep4Form
): StudentProfileAbilitiesInput {
  return {
    skills: studentProfileForm.skills.map((softSkillId) => {
      return {
        id: softSkillId,
      };
    }),
    languages: studentProfileForm.languages.map((selectedLanguage) => {
      return {
        language: selectedLanguage.language.id,
        languageLevel: selectedLanguage.level.id,
      };
    }),
    distinction: studentProfileForm.distinction,
    onlineChallenges: studentProfileForm.onlineChallenges,
    hobbies: studentProfileForm.hobbies,
  };
}
