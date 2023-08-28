<template>
  <form v-if="profileData && softSkills.length && culturalFits.length" @submit="veeForm.onSubmit">
    <p class="mb-8">
      Bei der Suche nach deiner Traumstelle kannst du Unternehmen finden, die ähnlich ticken wie du.
      Wähle aus den folgenden Vorschlägen alle Eigenschaften und Werte aus, die dich ausmachen und
      dir wichtig sind.
    </p>
    <FormSaveError v-if="showError" />
    <SelectPillMultiple
      :options="softSkills"
      name="softSkills"
      class="mb-10"
      @change="onChangeSoftSkill"
    >
      <template #label>Ich mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" #info>
        <template v-if="remainingSoftSkillCount === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ minSoftSkills - veeForm.softSkills.length }} für dich passende Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      name="culturalFits"
      class="mb-10"
      @change="onChangeCulturalFit"
    >
      <template #label>Es ist mir wichtig, dass ...</template>
      <template v-if="remainingCulturalFits > 0" #info>
        <template v-if="remainingCulturalFits === 1">
          Wähle noch 1 für dich passende Aussage aus
        </template>
        <template v-else>
          Wähle {{ minCulturalFits - veeForm.culturalFits.length }} für dich passende Aussagen aus
        </template></template
      >
    </SelectPillMultiple>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="$emit('clickCancel')"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="veeForm.onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="$emit('clickBack')">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="veeForm.onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script lang="ts">
import { studentProfileStep3FormMapper } from "@/api/mappers/studentProfileStep3FormMapper";
import { studentProfileStep3InputMapper } from "@/api/mappers/studentProfileStep3InputMapper";
import type { CulturalFit, SoftSkill } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import type { SelectPillMultipleItem } from "@/types/selectPillMultiple";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { OnboardingState } from "@/models/OnboardingState";
import type { StudentProfileStep3Form } from "@/models/StudentProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { Field, useField, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    Field,
    MatchdButton,
    FormSaveError,
    SelectPillMultiple,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class StudentStep3 extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep3Form>({});

    const { value: softSkills } = useField<string[]>(
      "softSkills",
      (value) => (value as string[])?.length >= this.minSoftSkills
    );
    const { value: culturalFits } = useField<string[]>(
      "culturalFits",
      (value) => (value as string[])?.length >= this.minCulturalFits
    );

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
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
    });

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

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  onChangeSoftSkill(softSkill: SoftSkill): void {
    const softSkillExists = !!this.veeForm.softSkills.find((id) => id === softSkill.id);
    if (softSkillExists) {
      this.veeForm.softSkills = this.veeForm.softSkills.filter((id) => id !== softSkill.id);
    } else if (this.remainingSoftSkillCount > 0) {
      this.veeForm.softSkills = [...this.veeForm.softSkills, softSkill.id];
    }
  }

  onChangeCulturalFit(culturalFit: CulturalFit): void {
    const culturalFitExists = !!this.veeForm.culturalFits.find((id) => id === culturalFit.id);
    if (culturalFitExists) {
      this.veeForm.culturalFits = this.veeForm.culturalFits.filter((id) => id !== culturalFit.id);
    } else if (this.remainingCulturalFits > 0) {
      this.veeForm.culturalFits = [...this.veeForm.culturalFits, culturalFit.id];
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
      values: this.profileData,
    });

    calculateMargins();
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
