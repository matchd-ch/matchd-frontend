<template>
  <Form v-if="softSkills.length > 0" @submit="onSubmit">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <SelectPillMultiple
      :options="softSkills"
      @change="onChangeSoftSkill"
      name="softSkills"
      class="mb-10"
    >
      <template v-slot:label>Ich mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" v-slot:info>
        <template v-if="remainingSoftSkillCount === 1">
          Wählen noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wählen {{ this.minSoftSkills - form.softSkills.length }} für dich passende Aussagen aus
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
import { studentProfileStep3InputMapper } from "@/api/mappers/studentProfileStep3InputMapper";
import GenericError from "@/components/GenericError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SelectPillMultiple, { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { OnboardingState } from "@/models/OnboardingState";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import type { SoftSkill } from "api";
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
export default class StudentStep3 extends Vue {
  form: StudentProfileStep3Form = {
    softSkills: [],
  };
  minSoftSkills = 6;

  get remainingSoftSkillCount(): number {
    return this.minSoftSkills - this.form.softSkills.length;
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

  async mounted(): Promise<void> {
    await Promise.all([this.$store.dispatch(ContentActionTypes.SOFT_SKILLS)]);
  }

  async onSubmit(): Promise<void> {
    await this.$store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP3,
      studentProfileStep3InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt5" } });
    }
  }
}
</script>

<style></style>
