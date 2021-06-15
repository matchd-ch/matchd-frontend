<template>
  <form v-if="profileData && softSkills.length && culturalFits.length" @submit="veeForm.onSubmit">
    <p class="mb-8">
      Um den Perfect-Match für Ihr Bildungsinstitut im Talentpool zu finden, können Sie aus den
      folgenden Vorschlägen alle Eigenschaften und Werte auswählen, die Ihnen bei einem Talent
      wichtig sind.
    </p>
    <FormSaveError v-if="showError" />
    <SelectPillMultiple
      :options="softSkills"
      @change="onChangeSoftSkill"
      name="softSkills"
      class="mb-10"
    >
      <template v-slot:label>Das Talent mag es ...</template>
      <template v-if="remainingSoftSkillCount > 0" v-slot:info>
        <template v-if="remainingSoftSkillCount === 1">
          Wählen Sie noch 1 für Sie passende Aussage aus
        </template>
        <template v-else>
          Wählen Sie {{ this.minSoftSkills - veeForm.softSkills.length }} für Sie passende Aussagen
          aus
        </template>
      </template>
    </SelectPillMultiple>
    <SelectPillMultiple
      :options="culturalFits"
      @change="onChangeCulturalFit"
      name="culturalFits"
      class="mb-10"
    >
      <template v-slot:label>Ihrem Bildungsinstitut ist es wichtig, dass ...</template>
      <template v-if="remainingCulturalFits > 0" v-slot:info>
        <template v-if="remainingCulturalFits === 1">
          Wählen Sie noch 1 für Sie passende Aussage aus
        </template>
        <template v-else>
          Wählen Sie {{ this.minCulturalFits - veeForm.culturalFits.length }} für Sie passende
          Aussagen aus
        </template>
      </template>
    </SelectPillMultiple>
    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            @click="$emit('clickCancel')"
            class="mb-2 xl:mr-4 xl:mb-0"
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
      <MatchdButton type="button" variant="outline" @click="$emit('clickBack')" class="mr-4">
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
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SelectPillMultiple, { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { OnboardingState } from "@/models/OnboardingState";
import { CompanyProfileStep4Form } from "@/models/CompanyProfileStep4Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import type { CulturalFit, SoftSkill } from "api";
import { Field, useField, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import { UniversityProfileStep4Form } from "@/models/UniversityProfileStep4Form";
import { universityProfileStep4FormMapper } from "@/api/mappers/universityProfileStep4FormMapper";
import { universityProfileStep4InputMapper } from "@/api/mappers/universityProfileStep4InputMapper";

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
export default class UniversityStep4Form extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<CompanyProfileStep4Form>({});

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
            ActionTypes.UNIVERSITY_ONBOARDING_STEP4,
            universityProfileStep4InputMapper(formData)
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
        name: softSkill.company,
        checked: !!this.veeForm?.softSkills?.find((id) => id === softSkill.id),
      };
    });
  }

  get culturalFits(): SelectPillMultipleItem[] {
    return this.$store.getters["culturalFits"].map((culturalFit) => {
      return {
        id: culturalFit.id,
        name: culturalFit.company,
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

  get profileData(): UniversityProfileStep4Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as UniversityProfileStep4Form;
    }
    return universityProfileStep4FormMapper(user);
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
