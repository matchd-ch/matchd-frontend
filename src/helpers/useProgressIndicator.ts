import { AttachmentKey, ProfileType } from "@/api/models/types";
import { useStore } from "@/store";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { ComputedRef } from "vue";
import { computed, watch } from "vue";

export type StudentSections =
  | "personalData"
  | "searchingFor"
  | "aboutMe"
  | "skillsAndTalents"
  | "nickname";

export type CompanySections =
  | "contactData"
  | "shortProfile"
  | "activitiesAndBenefits"
  | "setupTalentSearch";

export type UniversitySections =
  | "contactData"
  | "shortProfile"
  | "activitiesAndBenefits"
  | "setupTalentSearch";

type ProgressValue = unknown[] | string | object | number | boolean | null | undefined;

type ProgressConfig<T extends string> = Record<T, ProgressValue[]>;

export default () => {
  const store = useStore();

  const studentAvatar = computed(() =>
    store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentAvatar })
  );

  const companyAvatar = computed(() =>
    store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar })
  );

  const companyDocuments = computed(() =>
    store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments })
  );

  const user = computed(() => {
    return store.getters["user"];
  });

  const studentProgressConfig: ComputedRef<ProgressConfig<StudentSections>> = computed(() => ({
    personalData: [
      user.value?.student?.firstName,
      user.value?.student?.lastName,
      user.value?.student?.dateOfBirth,
      user.value?.student?.street,
      user.value?.student?.zip,
      user.value?.student?.city,
    ],
    searchingFor: [user.value?.student?.jobType, user.value?.student?.branch],
    aboutMe: [user.value?.student?.softSkills.edges, user.value?.student?.culturalFits.edges],
    skillsAndTalents: [
      user.value?.student?.skills.edges,
      user.value?.student?.languages.edges,
      user.value?.student?.hobbies,
      user.value?.student?.distinction,
    ],
    nickname: [user.value?.student?.nickname, studentAvatar.value],
  }));

  const companyProgressConfig: ComputedRef<ProgressConfig<CompanySections>> = computed(() => ({
    contactData: [
      user.value?.company?.name,
      user.value?.company?.street,
      user.value?.company?.zip,
      user.value?.company?.city,
      user.value?.employee?.firstName,
      user.value?.employee?.lastName,
      user.value?.employee?.role,
      user.value?.employee?.phone,
    ],
    shortProfile: [
      user.value?.company?.website,
      user.value?.company?.description,
      companyAvatar.value,
      user.value?.company?.services,
    ],
    activitiesAndBenefits: [
      user.value?.company?.branches.edges,
      user.value?.company?.benefits.edges,
      companyDocuments.value,
    ],
    setupTalentSearch: [user.value?.company?.softSkills, user.value?.company?.culturalFits],
  }));

  const universityProgressConfig: ComputedRef<ProgressConfig<UniversitySections>> = computed(
    () => ({
      contactData: [
        user.value?.company?.name,
        user.value?.company?.street,
        user.value?.company?.zip,
        user.value?.company?.city,
        user.value?.employee?.firstName,
        user.value?.employee?.lastName,
        user.value?.employee?.role,
        user.value?.employee?.phone,
        user.value?.company?.website,
        user.value?.company?.topLevelOrganisationWebsite,
        user.value?.company?.topLevelOrganisationWebsite,
      ],
      shortProfile: [
        user.value?.company?.description,
        companyAvatar.value,
        user.value?.company?.services,
      ],
      activitiesAndBenefits: [
        user.value?.company?.branches.edges,
        user.value?.company?.benefits.edges,
        user.value?.company?.linkChallenges,
        user.value?.company?.linkEducation,
        user.value?.company?.linkThesis,
        user.value?.company?.services,
        companyDocuments.value,
      ],
      setupTalentSearch: [user.value?.company?.softSkills, user.value?.company?.culturalFits],
    })
  );

  const studentProgress = computed(() => {
    if (!user.value?.student) {
      return null;
    }
    return getProgressDataByConfig(studentProgressConfig.value);
  });

  const companyProgress = computed(() => {
    if (!user.value?.company) {
      return null;
    }
    return getProgressDataByConfig(companyProgressConfig.value);
  });

  const universityProgress = computed(() => {
    if (!user.value?.company) {
      return null;
    }
    return getProgressDataByConfig(universityProgressConfig.value);
  });

  const getProgressDataByConfig = <T extends string>(config: ProgressConfig<T>) => {
    const sections = Object.entries<ProgressValue[]>(config).map(([sectionName, section]) => {
      const sectionValueSum = section
        .map((value) => {
          if (!value) {
            return 0;
          }
          if (Array.isArray(value) && value.length === 0) {
            return 0;
          }
          return 1;
        })
        .reduce<number>((prev, curr) => prev + curr, 0);
      return {
        key: sectionName as T,
        value: sectionValueSum / section.length,
      };
    });
    const progressObject = sections.reduce<{
      global: number;
      sections: Partial<Record<T, number>>;
    }>(
      (prev, curr) => {
        return {
          global: prev.global + curr.value,
          sections: { ...prev.sections, [curr.key]: curr.value },
        };
      },
      {
        global: 0,
        sections: {},
      }
    ) as {
      global: number;
      sections: Record<T, number>;
    };

    progressObject.global = progressObject.global / Object.keys(progressObject.sections).length;
    return progressObject;
  };

  const convertToPercent = (value: number) => {
    return Math.floor(value * 100);
  };

  const useProgressFormatted = <T extends string>(
    progress: ComputedRef<{
      global: number;
      sections: Record<T, number>;
    } | null>
  ) =>
    computed(() => {
      if (!progress.value) {
        return null;
      }
      const sections: Partial<Record<T, number>> = {};
      Object.entries<number>(progress.value.sections).forEach(
        ([k, v]) => (sections[k as T] = convertToPercent(v))
      );
      return {
        global: convertToPercent(progress.value.global),
        sections: sections as Record<T, number>,
      };
    });

  const formatProgress = (value: number, postfix: boolean = true) => {
    return `${Math.floor(value * 100)}${postfix ? "%" : ""}`;
  };

  const progress = computed(() => {
    switch (user.value?.type) {
      case ProfileType.Student:
        return studentProgress.value;
      case ProfileType.University:
        return universityProgress.value;
      case ProfileType.Company:
        return companyProgress.value;
      default:
        return null;
    }
  });

  const isType = (type: ProfileType) => computed(() => user.value?.type === type);

  watch(
    user,
    () => {
      console.warn("USER");
      if (user.value?.company) {
        store.dispatch(UploadActionTypes.UPLOADED_FILES, {
          key: AttachmentKey.CompanyAvatar,
        });
        store.dispatch(UploadActionTypes.UPLOADED_FILES, {
          key: AttachmentKey.CompanyDocuments,
        });
      }
      if (user.value?.student) {
        store.dispatch(UploadActionTypes.UPLOADED_FILES, {
          key: AttachmentKey.StudentAvatar,
        });
      }
    },
    { immediate: true }
  );

  return {
    progress,
    studentProgress,
    companyProgress,
    universityProgress,
    useProgressFormatted,
    formatProgress,
    isType,
  };
};
