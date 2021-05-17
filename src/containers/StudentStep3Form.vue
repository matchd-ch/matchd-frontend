<template>
  <form v-if="profileData && softSkills.length && culturalFits.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <SelectPillMultiple
      :options="softSkills"
      @change="onChangeSoftSkill"
      name="softSkills"
      class="mb-10"
    >
      <template v-slot:label>Ich mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" v-slot:info>
        <template v-if="remainingSoftSkillCount === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ this.minSoftSkills - veeForm.softSkills.length }} für dich passende Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      @change="onChangeCulturalFit"
      name="culturalFits"
      class="mb-10"
    >
      <template v-slot:label>Es ist mir wichtig, dass ...</template>
      <template v-if="remainingCulturalFits > 0" v-slot:info>
        <template v-if="remainingCulturalFits === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ this.minCulturalFits - veeForm.culturalFits.length }} für dich passende Aussagen
          aus
        </template></template
      >
    </SelectPillMultiple>
    <slot />
  </form>
</template>

<script lang="ts">
import { studentProfileStep3FormMapper } from "@/api/mappers/studentProfileStep3FormMapper";
import { studentProfileStep3InputMapper } from "@/api/mappers/studentProfileStep3InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import SelectPillMultiple, { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { OnboardingState } from "@/models/OnboardingState";
import { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { CulturalFit, SoftSkill } from "api";
import { Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import cloneDeep from "clone-deep";

@Options({
  components: {
    Field,
    FormSaveError,
    SelectPillMultiple,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class StudentStep3Form extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep3Form>({});

    const { value: softSkills } = useField<string[]>(
      "softSkills",
      (value: string[]) => value?.length >= this.minSoftSkills
    );
    const { value: culturalFits } = useField<string[]>(
      "culturalFits",
      (value: string[]) => value?.length >= this.minCulturalFits
    );

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.STUDENT_ONBOARDING_STEP3,
            studentProfileStep3InputMapper(formData)
          );

          const onboardingState = store.getters["onboardingState"];
          this.$emit("submitComplete", onboardingState.success);
        } catch (e) {
          console.log(e);
        }
      }
    );

    return {
      ...form,
      onSubmit,
      softSkills,
      culturalFits,
    };
  });

  minSoftSkills = 6;
  minCulturalFits = 6;

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get remainingSoftSkillCount(): number {
    return this.minSoftSkills - this.veeForm?.softSkills?.length;
  }

  get remainingCulturalFits(): number {
    return this.minCulturalFits - this.veeForm?.culturalFits?.length;
  }

  get softSkills(): SelectPillMultipleItem[] {
    return this.$store.getters["softSkills"].map((softSkill) => {
      return {
        id: softSkill.id,
        name: softSkill.student,
        checked: !!this.veeForm?.softSkills?.find((id) => id === softSkill.id),
      };
    });
  }

  get culturalFits(): SelectPillMultipleItem[] {
    return this.$store.getters["culturalFits"].map((culturalFit) => {
      return {
        id: culturalFit.id,
        name: culturalFit.student,
        checked: !!this.veeForm?.culturalFits?.find((id) => id === culturalFit.id),
      };
    });
  }

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  onChangeSoftSkill(softSkill: SoftSkill): void {
    const softSkillExists = !!this.veeForm.softSkills.find((id) => id === softSkill.id);
    if (softSkillExists) {
      this.veeForm.softSkills = this.veeForm.softSkills.filter((id) => id !== softSkill.id);
    } else if (this.remainingSoftSkillCount > 0) {
      this.veeForm.softSkills.push(softSkill.id);
      this.veeForm.softSkills.sort((a: string, b: string) => parseInt(a) - parseInt(b));
    }
  }

  onChangeCulturalFit(culturalFit: CulturalFit): void {
    const culturalFitExists = !!this.veeForm.culturalFits.find((id) => id === culturalFit.id);
    if (culturalFitExists) {
      this.veeForm.culturalFits = this.veeForm.culturalFits.filter((id) => id !== culturalFit.id);
    } else if (this.remainingCulturalFits > 0) {
      this.veeForm.culturalFits.push(culturalFit.id);
      this.veeForm.culturalFits.sort((a: string, b: string) => parseInt(a) - parseInt(b));
    }
  }

  get profileData(): StudentProfileStep3Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep3Form;
    }
    return studentProfileStep3FormMapper(user);
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.SOFT_SKILLS),
      this.$store.dispatch(ContentActionTypes.CULTURAL_FITS),
    ]);

    this.veeForm.resetForm({
      values: cloneDeep(this.profileData),
    });

    if (this.currentStep && this.currentStep > 3) {
      this.veeForm.setValues(cloneDeep(this.profileData));
    }
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
