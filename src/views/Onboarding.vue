<template>
  <div v-if="currentStep" class="onboarding min-h-screen">
    <div
      class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 lg:border-b border-primary-1"
    >
      <h1
        class="text-display-xl-fluid col-start-1 col-span-4 row-start-1 border-r border-primary-1 flex items-center px-4 lg:px-5 py-10 text-primary-1"
      >
        Profil
      </h1>
      <div
        class="col-start-5 col-span-4 row-start-1 text-display-xl-fluid lg:hidden flex items-center justify-center px-4 lg:px-5 py-10 text-primary-1"
      >
        <template v-if="currentStep <= 6">{{ currentStep }}</template>
      </div>
      <h2
        class="text-display-xs-fluid flex items-center col-start-1 lg:col-start-5 col-span-8 row-start-3 lg:row-start-1 border-t lg:border-t-0 lg:border-r flex items-center px-4 lg:px-8 py-10 text-primary-1"
      >
        <template v-if="isStudent">
          <span v-if="currentStep <= 6" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständige deine persönlichen Daten</template>
          <template v-else-if="currentStep === 2">Wonach suchst du?</template>
          <template v-else-if="currentStep === 3">Erzähl uns mehr von dir</template>
          <template v-else-if="currentStep === 4">Zeig uns, was du drauf hast</template>
          <template v-else-if="currentStep === 5">Finalisiere dein Profil</template>
          <template v-else-if="currentStep === 6">Veröffentliche dein Profil</template>
          <template v-else-if="currentStep > 6">Willkommen in der Matchd-Community 🤩</template>
        </template>
        <template v-else-if="isCompany">
          <span v-if="currentStep <= 4" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständigen Sie Ihre Kontaktdaten</template>
          <template v-if="currentStep === 2"
            >Erzählen Sie den Talenten mehr über Ihr Unternehmen</template
          >
          <template v-if="currentStep === 3"
            >Zeigen Sie der Matchd-Community, was Ihr Unternehmen als Arbeitgeber*in
            bietet</template
          >
          <template v-if="currentStep === 4"
            >Wichtige Eigenschaften und Werte bei der Talentsuche</template
          >
          <template v-if="currentStep === 5">Willkommen in der Matchd-Community</template>
        </template>
        <template v-else-if="isUniversity">
          <span v-if="currentStep <= 5" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständigen sie ihre Kontaktdaten</template>
          <template v-if="currentStep === 2">Erzählen sie von ihrer Bildungsinstitution</template>
          <template v-if="currentStep === 3"
            >Weitere Informationen ihrer Bildungsinstitution</template
          >
          <template v-if="currentStep === 4"
            >Wichtige Eigenschaften und Werte bei der Talentsuche</template
          >
          <template v-if="currentStep === 5"
            >Herzliche Gratulation und willkommen in der Matchd-Community!</template
          >
        </template>
      </h2>
      <div class="col-start-13 col-span-4 hidden lg:block"></div>
    </div>
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="currentOnboardingComponent"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
        @submit-complete="onSubmitComplete"
        @click-back="onClickBack"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { parseStepName } from "@/helpers/parseStepName";
import { ParamStrings } from "@/router/paramStrings";
import {
  CompanyFinish as CompanyStep5,
  CompanySettingsAccount,
  CompanyStep1,
  CompanyStep2,
  CompanyStep3,
  CompanyStep4,
} from "@/views/profile/company";
import {
  StudentFinish as StudentStep7,
  StudentSettingsAccount,
  StudentStep1,
  StudentStep2,
  StudentStep3,
  StudentStep4,
  StudentStep5,
  StudentStep6,
} from "@/views/profile/student";
import {
  UniversityFinish as UniversityStep5,
  UniversitySettingsAccount,
  UniversityStep1,
  UniversityStep2,
  UniversityStep3,
  UniversityStep4,
} from "@/views/profile/university";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    StudentStep1,
    StudentStep2,
    StudentStep3,
    StudentStep4,
    StudentStep5,
    StudentStep6,
    StudentStep7,
    StudentSettingsAccount,
    CompanyStep1,
    CompanyStep2,
    CompanyStep3,
    CompanyStep4,
    CompanyStep5,
    CompanySettingsAccount,
    UniversityStep1,
    UniversityStep2,
    UniversityStep3,
    UniversityStep4,
    UniversityStep5,
    UniversitySettingsAccount,
  },
})
export default class Onboarding extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Profil vervollständigen",
    })
  );

  urlStepNumber = 0;

  get currentOnboardingComponent(): string {
    if (this.isUniversity) {
      return `UniversityStep${this.currentStep}`;
    } else if (this.isCompany) {
      return `CompanyStep${this.currentStep}`;
    } else {
      return `StudentStep${this.currentStep}`;
    }
  }

  get currentStep(): number | undefined {
    return parseStepName(String(this.$route.params.step)) || this.$store.getters["profileStep"];
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
    next();
  }

  onClickBack(): void {
    if (this.currentStep) {
      this.$router.push({ params: { step: `${ParamStrings.STEP}${this.currentStep - 1}` } });
    }
  }

  onSubmitComplete(success: boolean): void {
    if (success && this.currentStep) {
      this.$router.push({ params: { step: `${ParamStrings.STEP}${this.currentStep + 1}` } });
    }
  }
}
</script>

<style></style>
