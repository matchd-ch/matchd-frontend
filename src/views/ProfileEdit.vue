<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation v-if="isStudent">
      <ProfileNavigationItem
        v-for="profile in profiles.student"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        <ProgressIndicatorIcon :label="profile.label" :progress="profile.progress" />
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isCompany">
      <ProfileNavigationItem
        v-for="profile in profiles.company"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        <ProgressIndicatorIcon :label="profile.label" :progress="profile.progress" />
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isUniversity">
      <ProfileNavigationItem
        v-for="profile in profiles.university"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        <ProgressIndicatorIcon :label="profile.label" :progress="profile.progress" />
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div class="profil min-h-content-with-fixed-bars">
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="currentProfile?.component"
        v-if="currentProfile?.component"
        :edit="true"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 px-4 lg:px-5 py-12"
        @change-dirty="onChangeDirty"
        @submit-complete="onSubmitComplete"
        @click-cancel="onClickCancel"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileNavigation from "@/components/ProfileNavigation.vue";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import ProgressIndicatorIcon from "@/components/ProgressIndicatorIcon.vue";
import useProgressIndicator from "@/helpers/useProgressIndicator";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import {
  CompanySettingsAccount,
  CompanyStep1,
  CompanyStep2,
  CompanyStep3,
  CompanyStep4,
} from "@/views/profile/company";
import {
  StudentSettingsAccount,
  StudentStep1,
  StudentStep2,
  StudentStep3,
  StudentStep4,
  StudentStep5,
  StudentStep6,
} from "@/views/profile/student";
import {
  UniversitySettingsAccount,
  UniversityStep1,
  UniversityStep2,
  UniversityStep3,
  UniversityStep4,
} from "@/views/profile/university";
import { computed, ref } from "vue";
import { useMeta } from "vue-meta";
import type { NavigationGuardNext } from "vue-router";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

interface ProfileItem {
  component:
    | typeof CompanySettingsAccount
    | typeof CompanyStep1
    | typeof CompanyStep2
    | typeof CompanyStep3
    | typeof CompanyStep4
    | typeof StudentSettingsAccount
    | typeof StudentStep1
    | typeof StudentStep2
    | typeof StudentStep3
    | typeof StudentStep4
    | typeof StudentStep5
    | typeof StudentStep6
    | typeof UniversityStep1
    | typeof UniversityStep2
    | typeof UniversityStep3
    | typeof UniversityStep4
    | typeof UniversitySettingsAccount;
  label: string;
  step: string;
  progress?: number;
  /** Is set to true it disables the isDirty confirmation dialog before */
  disableIsDirtyCheck?: boolean;
}

interface Profiles {
  company: ProfileItem[];
  student: ProfileItem[];
  university: ProfileItem[];
}

const { companyProgress, studentProgress, universityProgress } = useProgressIndicator();

const profiles = computed<Profiles>(() => ({
  company: [
    {
      component: CompanyStep1,
      step: "schritt1",
      label: "Kontaktdaten",
      progress: companyProgress.value?.sections.contactData,
    },
    {
      component: CompanyStep2,
      step: "schritt2",
      label: "Kurzsteckbrief",
      progress: companyProgress.value?.sections.shortProfile,
    },
    {
      component: CompanyStep3,
      step: "schritt3",
      label: "Tätigkeitsbereich & Benefits",
      progress: companyProgress.value?.sections.activitiesAndBenefits,
    },
    {
      component: CompanyStep4,
      step: "schritt4",
      label: "Set-up Talentsuche",
      progress: companyProgress.value?.sections.setupTalentSearch,
    },
    {
      component: CompanySettingsAccount,
      step: "konto",
      label: "Konto",
      disableIsDirtyCheck: true,
    },
  ],
  student: [
    {
      component: StudentStep1,
      step: "schritt1",
      label: "Persönliche Daten",
      progress: studentProgress.value?.sections.personalData,
    },
    {
      component: StudentStep2,
      step: "schritt2",
      label: "Ich suche",
      progress: studentProgress.value?.sections.searchingFor,
    },
    {
      component: StudentStep3,
      step: "schritt3",
      label: "Über mich",
      progress: studentProgress.value?.sections.aboutMe,
    },
    {
      component: StudentStep4,
      step: "schritt4",
      label: "Skills & Talente",
      progress: studentProgress.value?.sections.skillsAndTalents,
    },
    {
      component: StudentStep5,
      step: "schritt5",
      label: "Nickname & Foto",
      progress: studentProgress.value?.sections.nickname,
    },
    {
      component: StudentStep6,
      step: "schritt6",
      label: "Profilstatus",
    },
    {
      component: StudentSettingsAccount,
      step: "konto",
      label: "Konto",
      disableIsDirtyCheck: true,
    },
  ],
  university: [
    {
      component: UniversityStep1,
      step: "schritt1",
      label: "Kontaktdaten",
      progress: universityProgress.value?.sections.contactData,
    },
    {
      component: UniversityStep2,
      step: "schritt2",
      label: "Kurzsteckbrief",
      progress: universityProgress.value?.sections.shortProfile,
    },
    {
      component: UniversityStep3,
      step: "schritt3",
      label: "Tätigkeitsbereich & Benefits",
      progress: universityProgress.value?.sections.activitiesAndBenefits,
    },
    {
      component: UniversityStep4,
      step: "schritt4",
      label: "Set-up Talentsuche",
      progress: universityProgress.value?.sections.setupTalentSearch,
    },
    {
      component: UniversitySettingsAccount,
      step: "konto",
      label: "Konto",
      disableIsDirtyCheck: true,
    },
  ],
}));

const store = useStore();
const dirty = ref(false);
const router = useRouter();
const route = useRoute();
useMeta({ title: "Profil bearbeiten" });

const isStudent = computed(() => {
  return store.getters["isStudent"];
});

const isCompany = computed(() => {
  return store.getters["isCompany"];
});

const isUniversity = computed(() => {
  return store.getters["isUniversity"];
});

const currentProfile = computed(() => {
  if (isUniversity.value) {
    return profiles.value.university.find((p) => p.step === route.params.step);
  } else if (isCompany.value) {
    return profiles.value.company.find((p) => p.step === route.params.step);
  } else {
    return profiles.value.student.find((p) => p.step === route.params.step);
  }
});

const confirmWhenDirty = (next: NavigationGuardNext) => {
  if (dirty.value) {
    const confirmed = window.confirm(
      "Auf dieser Seite gibt es ungespeicherte Angaben. Seite trotzdem verlassen?"
    );
    store.commit(MutationTypes.CLEAR_ONBOARDING_STATE);
    next(confirmed);
  } else {
    next();
  }
};

const onChangeDirty = (newDirty: boolean) => {
  dirty.value = newDirty;
};

const onClickCancel = () => {
  router.push({ name: Routes.PROFILE });
};

const onSubmitComplete = async (success: boolean) => {
  if (success) {
    dirty.value = false;
    router.go(0);
  }
};

onBeforeRouteUpdate(async (_to, _from, next) => {
  confirmWhenDirty(next);
});
onBeforeRouteLeave(async (_to, _from, next) => {
  confirmWhenDirty(next);
});
</script>

<style></style>
