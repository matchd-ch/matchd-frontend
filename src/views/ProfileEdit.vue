<template>
  <teleport to="#teleporter-app-header">
    <ProfileNavigation v-if="isStudent">
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="urlStepNumber === 1">
        Persönliche Daten
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt2' } }" :active="urlStepNumber === 2">
        Ich suche
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt3' } }" :active="urlStepNumber === 3">
        Über mich
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt4' } }" :active="urlStepNumber === 4">
        Skills & Talente
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt5' } }" :active="urlStepNumber === 5">
        Nickname & Foto
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt6' } }" :active="urlStepNumber === 6">
        Profilstatus
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isCompany">
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="urlStepNumber === 1">
        Kontaktdaten
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt2' } }" :active="urlStepNumber === 2">
        Kurzsteckbrief
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt3' } }" :active="urlStepNumber === 3">
        Tätigkeitsbereich & Benefits
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt4' } }" :active="urlStepNumber === 4">
        Set-up Talentsuche
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt5' } }" :active="urlStepNumber === 5">
        Konto
      </ProfileNavigationItem>
    </ProfileNavigation>
    <ProfileNavigation v-else-if="isUniversity">
      <ProfileNavigationItem :to="{ params: { step: 'schritt1' } }" :active="urlStepNumber === 1">
        Kontaktdaten
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt2' } }" :active="urlStepNumber === 2">
        Kurzsteckbrief
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt3' } }" :active="urlStepNumber === 3">
        Tätigkeitsbereich & Benefits
      </ProfileNavigationItem>
      <ProfileNavigationItem :to="{ params: { step: 'schritt4' } }" :active="urlStepNumber === 4">
        Set-up Talentsuche
      </ProfileNavigationItem>
    </ProfileNavigation>
  </teleport>
  <div class="profil min-h-content-with-fixed-bars">
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="currentProfileComponent"
        edit="true"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 px-4 lg:px-5 py-12"
        @change-dirty="onChangeDirty"
        @submit-complete="onSubmitComplete"
        @click-cancel="onClickCancel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import ProfileNavigation from "@/components/ProfileNavigation.vue";
import ProfileNavigationItem from "@/components/ProfileNavigationItem.vue";
import { parseStepName } from "@/helpers/parseStepName";
import { MutationTypes } from "@/store/modules/profile/mutation-types";
import {
  CompanyFinish as CompanyStep6,
  CompanyStep1,
  CompanyStep2,
  CompanyStep3,
  CompanyStep4,
  CompanyStep5,
} from "@/views/profile/company";
import {
  StudentFinish as StudentStep7,
  StudentStep1,
  StudentStep2,
  StudentStep3,
  StudentStep4,
  StudentStep5,
  StudentStep6,
} from "@/views/profile/student";
import {
  UniversityFinish as UniversityStep5,
  UniversityStep1,
  UniversityStep2,
  UniversityStep3,
  UniversityStep4,
} from "@/views/profile/university";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate", "beforeRouteLeave"]);

@Options({
  components: {
    StudentStep1,
    StudentStep2,
    StudentStep3,
    StudentStep4,
    StudentStep5,
    StudentStep6,
    StudentStep7,
    CompanyStep1,
    CompanyStep2,
    CompanyStep3,
    CompanyStep4,
    CompanyStep5,
    CompanyStep6,
    UniversityStep1,
    UniversityStep2,
    UniversityStep3,
    UniversityStep4,
    UniversityStep5,
    ProfileNavigation,
    ProfileNavigationItem,
  },
})
export default class ProfileEdit extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Profil bearbeiten",
    })
  );

  urlStepNumber = 0;
  dirty = false;

  get currentProfileComponent(): string {
    if (this.isUniversity) {
      return `UniversityStep${this.urlStepNumber}`;
    } else if (this.isCompany) {
      return `CompanyStep${this.urlStepNumber}`;
    } else {
      return `StudentStep${this.urlStepNumber}`;
    }
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get isCompany(): boolean {
    return this.$store.getters["isCompany"];
  }

  get isUniversity(): boolean {
    return this.$store.getters["isUniversity"];
  }

  mounted(): void {
    this.urlStepNumber = parseStepName(String(this.$route.params.step));
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    this.urlStepNumber = parseStepName(String(to.params.step));
    this.confirmWhenDirty(next);
  }

  async beforeRouteLeave(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    this.confirmWhenDirty(next);
  }

  confirmWhenDirty(next: NavigationGuardNext): void {
    if (this.dirty) {
      const confirmed = window.confirm(
        "Auf dieser Seite gibt es ungespeicherte Angaben. Seite trotzdem verlassen?"
      );
      this.$store.commit(MutationTypes.CLEAR_ONBOARDING_STATE);
      next(confirmed);
    } else {
      next();
    }
  }

  onChangeDirty(dirty: boolean): void {
    this.dirty = dirty;
  }

  onClickCancel(): void {
    this.$router.push({ name: "Profile" });
  }

  onSubmitComplete(success: boolean): void {
    if (success) {
      this.dirty = false;
      this.$router.push({ name: "Profile" });
    }
  }
}
</script>

<style></style>
