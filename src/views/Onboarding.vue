<template>
  <div class="onboarding min-h-screen text-primary-1">
    <div class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 lg:border-b">
      <h1
        class="text-display-xl-fluid col-start-1 col-span-4 row-start-1 border-r flex items-center px-4 lg:px-5 py-10"
      >
        Profil
      </h1>
      <div
        class="col-start-5 col-span-4 row-start-1 text-display-xl-fluid lg:hidden flex items-center justify-center px-4 lg:px-5 py-10"
      >
        <template v-if="currentStep <= 6">{{ currentStep }}</template>
      </div>
      <h2
        class="text-display-xs-fluid flex items-center col-start-1 lg:col-start-5 col-span-8 row-start-3 lg:row-start-1 border-t lg:border-t-0 lg:border-r flex items-center px-4 lg:px-8 py-10"
      >
        <template v-if="isStudent">
          <span v-if="currentStep <= 6" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständige deine persönlichen Daten</template>
          <template v-else-if="currentStep === 2"
            >Welche Schule oder Hochschule besuchst du?</template
          >
          <template v-else-if="currentStep === 3">Wonach suchst du?</template>
          <template v-else-if="currentStep === 4">Sag uns, was du drauf hast.</template>
          <template v-else-if="currentStep === 5">Kreiere dein Profil</template>
          <template v-else-if="currentStep === 6">Veröffentliche dein Profil</template>
          <template v-else-if="currentStep > 6"
            >Willkommen bei Matchd! Was willst du als nächstes tun?
          </template>
        </template>
        <template v-else-if="isCompany">
          <span v-if="currentStep <= 4" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständigen sie ihre Kontaktdaten</template>
          <template v-if="currentStep === 2"
            >Erzählen sie von ihrem Unternehmen, ihren Produkten und Services</template
          >
          <template v-if="currentStep === 3"
            >Zeigen sie der Community Bilder und Videos von ihrem Unternehmen und von ihrer
            Crew</template
          >
          <template v-if="currentStep === 4"
            >Herzliche Gratulation und willkommen in der Matchd-Community!</template
          >
        </template>
        <template v-else-if="isUniversity">
          <span v-if="currentStep <= 4" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
            currentStep
          }}</span>
          <template v-if="currentStep === 1">Vervollständigen sie ihre Kontaktdaten</template>
          <template v-if="currentStep === 2">Erzählen sie von ihrer Bildungsinstitution</template>
          <template v-if="currentStep === 3"
            >Weitere Informationen ihrer Bildungsinstitution</template
          >
          <template v-if="currentStep === 4"
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
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CompanyStep1,
  CompanyStep2,
  CompanyStep3,
  CompanyFinish as CompanyStep4,
} from "@/views/onboarding/company";
import { UniversityStep1 } from "@/views/onboarding/university";
import {
  StudentStep1,
  StudentStep2,
  StudentStep3,
  StudentStep4,
  StudentStep5,
  StudentStep6,
  StudentFinish as StudentStep7,
} from "@/views/onboarding/student";
import { Options, Vue } from "vue-class-component";

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
    UniversityStep1,
  },
})
export default class Onboarding extends Vue {
  get currentOnboardingComponent() {
    if (this.isUniversity) {
      return `UniversityStep${this.currentStep}`;
    } else if (this.isCompany) {
      return `CompanyStep${this.currentStep}`;
    } else {
      return `StudentStep${this.currentStep}`;
    }
  }

  get currentStep() {
    return this.$store.getters["user"]?.profileStep;
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
}
</script>

<style></style>
