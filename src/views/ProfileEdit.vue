<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation v-if="isStudent">
      <ProfileNavigationItem
        v-for="profile in profiles.student"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        {{ profile.label }}
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isCompany">
      <ProfileNavigationItem
        v-for="profile in profiles.company"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        {{ profile.label }}
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isUniversity">
      <ProfileNavigationItem
        v-for="profile in profiles.university"
        :key="profile.step"
        :to="{ params: { step: profile.step } }"
        :active="route.params.step === profile.step"
      >
        {{ profile.label }}
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div class="profil min-h-content-with-fixed-bars">
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="currentProfileComponent"
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
import {
  NavigationGuardNext,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
  useRouter,
} from "vue-router";

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
}

interface Profiles {
  company: ProfileItem[];
  student: ProfileItem[];
  university: ProfileItem[];
}

const profiles: Profiles = {
  company: [
    {
      component: CompanyStep1,
      step: "schritt1",
      label: "Kontaktdaten",
    },
    {
      component: CompanyStep2,
      step: "schritt2",
      label: "Kurzsteckbrief",
    },
    {
      component: CompanyStep3,
      step: "schritt3",
      label: "Tätigkeitsbereich & Benefits",
    },
    {
      component: CompanyStep4,
      step: "schritt4",
      label: "Set-up Talentsuche",
    },
    {
      component: CompanySettingsAccount,
      step: "konto",
      label: "Konto",
    },
  ],
  student: [
    {
      component: StudentStep1,
      step: "schritt1",
      label: "Persönliche Daten",
    },
    {
      component: StudentStep2,
      step: "schritt2",
      label: "Ich suche",
    },
    {
      component: StudentStep3,
      step: "schritt3",
      label: "Über mich",
    },
    {
      component: StudentStep4,
      step: "schritt4",
      label: "Skills & Talente",
    },
    {
      component: StudentStep5,
      step: "schritt5",
      label: "Nickname & Foto",
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
    },
  ],
  university: [
    {
      component: UniversityStep1,
      step: "schritt1",
      label: "Kontaktdaten",
    },
    {
      component: UniversityStep2,
      step: "schritt2",
      label: "Kurzsteckbrief",
    },
    {
      component: UniversityStep3,
      step: "schritt3",
      label: "Tätigkeitsbereich & Benefits",
    },
    {
      component: UniversityStep4,
      step: "schritt4",
      label: "Set-up Talentsuche",
    },
    {
      component: UniversitySettingsAccount,
      step: "konto",
      label: "Konto",
    },
  ],
};

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

const currentProfileComponent = computed(() => {
  if (isUniversity.value) {
    return profiles.university.find((p) => p.step === route.params.step)?.component;
  } else if (isCompany.value) {
    return profiles.company.find((p) => p.step === route.params.step)?.component;
  } else {
    return profiles.student.find((p) => p.step === route.params.step)?.component;
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
  router.push({ name: "Profile" });
};

const onSubmitComplete = (success: boolean) => {
  if (success) {
    dirty.value = false;
    router.push({ name: "Profile" });
  }
};

onBeforeRouteUpdate(async (to, _from, next) => {
  confirmWhenDirty(next);
});
onBeforeRouteLeave(async (_to, _from, next) => {
  confirmWhenDirty(next);
});
</script>

<style></style>
