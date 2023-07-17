import type { MeQuery } from "@/api/queries/me.generated";
import { useStore } from "@/store";
import { computed } from "vue";

type ProgressValuesStudent = {
  global: number;
  sections: {
    personalData: number;
    search: number;
    about: number;
    skills: number;
    nickname: number;
  };
};

type ProgressValuesCompany = {
  global: number;
  sections: {
    contactData: number;
    profile: number;
    fieldOfActivity: number;
    talentSearch: number;
  };
};

type ProgressConfig = Record<
  string,
  ((
    user: NonNullable<MeQuery["me"]>
  ) => unknown[] | string | object | number | boolean | null | undefined)[]
>;

const studentProgressConfig: ProgressConfig = {
  personalData: [
    (obj) => obj.student?.firstName,
    (obj) => obj.student?.lastName,
    (obj) => obj.student?.dateOfBirth,
    (obj) => obj.student?.street,
    (obj) => obj.student?.zip,
    (obj) => obj.student?.city,
  ],
  searchingFor: [(obj) => obj.student?.jobType, (obj) => obj.student?.branch],
  aboutMe: [(obj) => obj.student?.softSkills.edges, (obj) => obj.student?.culturalFits.edges],
  skillsAndTalents: [
    (obj) => obj.student?.skills.edges,
    (obj) => obj.student?.languages.edges,
    (obj) => obj.student?.onlineChallenges,
    (obj) => obj.student?.hobbies,
    (obj) => obj.student?.distinction,
  ],
  nickname: [(obj) => obj.student?.nickname],
};

export default () => {
  const store = useStore();

  const user = computed(() => {
    return store.getters["user"];
  });

  const progress = computed(() => {
    if (user.value?.student) {
      return getProgressDataByConfig(studentProgressConfig);
    }
    if (user.value?.company) {
      return getProgressDataByConfig(studentProgressConfig);
    }
    return { global: 0, sections: {} };
  });

  const getProgressDataByConfig = (config: ProgressConfig) => {
    const sections = Object.entries(config).map(([_sectionName, section]) => {
      const sectionValueSum = section
        .map((valueGetter) => {
          if (!user.value) {
            return 0;
          }
          const val = valueGetter(user.value);
          if (!val) {
            return 0;
          }
          if (Array.isArray(val) && !val.length) {
            return 0;
          }
          return 1;
        })
        .reduce<number>((prev, curr) => prev + curr, 0);
      return {
        key: _sectionName,
        value: sectionValueSum / section.length,
      };
    });
    const progressObject = sections.reduce<{ global: number; sections: Record<string, number> }>(
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
    );
    progressObject.global = progressObject.global / Object.keys(progressObject.sections).length;
    console.log(progressObject);
    return progressObject;
  };

  const convertToPercent = (value: number) => {
    return Math.floor(value * 100);
  };

  const progressFormatted = computed(() => {
    const sections: Record<string, number> = {};
    Object.entries(progress.value.sections).forEach(
      ([k, v]) => (sections[k] = convertToPercent(v))
    );
    return {
      global: convertToPercent(progress.value.global),
      sections: sections,
    };
  });

  return {
    progress,
    progressFormatted,
  };
};
