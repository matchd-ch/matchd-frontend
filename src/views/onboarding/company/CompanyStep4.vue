<template>
  <Form v-if="softSkills.length > 0 && culturalFits.length > 0" @submit="onSubmit">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <SelectPillMultiple
      :options="softSkills"
      @change="onChangeSoftSkill"
      name="softSkills"
      class="mb-10"
    >
      <template v-slot:label>Die Kandidat*in mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" v-slot:info>
        <template v-if="remainingSoftSkillCount === 1">
          Wählen sie noch 1 für sie passende Aussage aus
        </template>
        <template v-else>
          Wählen sie {{ this.minSoftSkills - form.softSkills.length }} für sie passende Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      @change="onChangeCulturalFit"
      name="culturalFits"
      class="mb-10"
    >
      <template v-slot:label>Es ist uns wichtig, dass ...</template>
      <template v-if="remainingCulturalFits > 0" v-slot:info>
        <template v-if="remainingCulturalFits === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ this.minCulturalFits - form.culturalFits.length }} für dich passende Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading || form.softSkills.length < this.minSoftSkills"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { companyProfileStep4InputMapper } from "@/api/mappers/companyProfileStep4InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SelectPillMultiple, { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";
import { OnboardingState } from "@/models/OnboardingState";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import type { SoftSkill, CulturalFit } from "api";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    SelectPillMultiple,
  },
})
export default class CompanyStep4 extends Vue {
  form: CompanyProfileStep4Form = {
    softSkills: [],
    culturalFits: [],
  };
  minSoftSkills = 6;
  minCulturalFits = 6;

  get remainingSoftSkillCount(): number {
    return this.minSoftSkills - this.form.softSkills.length;
  }

  get remainingCulturalFits(): number {
    return this.minCulturalFits - this.form.culturalFits.length;
  }

  get softSkills(): SelectPillMultipleItem[] {
    return this.$store.getters["softSkills"].map((softSkill) => {
      return {
        id: softSkill.id,
        name: softSkill.student,
        checked: !!this.form.softSkills.find(
          (selectedSoftSkill) => selectedSoftSkill.id === softSkill.id
        ),
      };
    });
  }

  get culturalFits(): SelectPillMultipleItem[] {
    return this.$store.getters["culturalFits"].map((culturalFit) => {
      return {
        id: culturalFit.id,
        name: culturalFit.company,
        checked: !!this.form.culturalFits.find(
          (selectedCulturalFits) => selectedCulturalFits.id === culturalFit.id
        ),
      };
    });
  }

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  onChangeSoftSkill(softSkill: SoftSkill): void {
    const softSkillExists = !!this.form.softSkills.find(
      (selectedSoftSkill) => selectedSoftSkill.id === softSkill.id
    );
    if (softSkillExists) {
      this.form.softSkills = this.form.softSkills.filter(
        (selectedSoftSkill) => selectedSoftSkill.id !== softSkill.id
      );
    } else if (this.remainingSoftSkillCount > 0) {
      this.form.softSkills.push(softSkill);
    }
  }

  onChangeCulturalFit(culturalFit: CulturalFit): void {
    const culturalFitExists = !!this.form.culturalFits.find(
      (selectedCulturalFit) => selectedCulturalFit.id === culturalFit.id
    );
    if (culturalFitExists) {
      this.form.culturalFits = this.form.culturalFits.filter(
        (selectedCulturalFit) => selectedCulturalFit.id !== culturalFit.id
      );
    } else if (this.remainingCulturalFits > 0) {
      this.form.culturalFits.push(culturalFit);
    }
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.SOFT_SKILLS),
      this.$store.dispatch(ContentActionTypes.CULTURAL_FITS),
    ]);
  }

  async onSubmit(): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP4,
      companyProfileStep4InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt5" } });
    }
  }
}
</script>

<style></style>
