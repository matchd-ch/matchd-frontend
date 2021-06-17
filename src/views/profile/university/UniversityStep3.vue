<template>
  <form v-if="branches.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Link Education Field -->
    <MatchdField id="linkEducation" class="mb-10">
      <template v-slot:label>Wissenswertes zur Aus- und Weiterbildung</template>
      <Field
        id="linkEducation"
        name="linkEducation"
        as="input"
        label="Wissenswertes zur Aus- und Weiterbildung"
        rules="url"
      />
    </MatchdField>
    <!-- Link Projects Field -->
    <MatchdField id="linkProjects" class="mb-10">
      <template v-slot:label>Wissenswertes zum Thema Praxisprojekte</template>
      <Field
        id="linkProjects"
        name="linkProjects"
        as="input"
        label="Wissenswertes zum Thema Praxisprojekte"
        rules="url"
      />
    </MatchdField>
    <!-- Link Thesis Field -->
    <MatchdField id="linkThesis" class="mb-10">
      <template v-slot:label>Wissenswertes zur Thema Abschlussarbeiten</template>
      <Field
        id="linkThesis"
        name="linkThesis"
        as="input"
        label="Wissenswertes zur Thema Abschlussarbeiten"
        rules="url"
      />
    </MatchdField>
    <!-- Description Field -->
    <MatchdField id="services" class="mb-10">
      <template v-slot:label>Unser Angebot</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        maxlength="300"
        label="Services"
        class="h-72"
      />
      <template v-slot:info>Maximal 300 Zeichen</template>
    </MatchdField>
    <!-- Branch Field -->
    <SelectPillMultiple :options="branches" @change="onChangeBranch" name="branches" class="mb-10">
      <template v-slot:label
        >In diesen Bereichen und Projekten können Talente bei Ihnen tätig werden</template
      >
    </SelectPillMultiple>
    <!-- Benefits Field -->
    <SelectIconGroup class="mb-10" :icons="benefits" name="benefits" @change="onChangeBenefits">
      <template v-slot:label>Das erwartet dich bei uns</template>
    </SelectIconGroup>

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
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { OnboardingState } from "@/models/OnboardingState";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import type { Branch, Benefit } from "api";
import { ErrorMessage, Field, useField, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import MatchdField from "@/components/MatchdField.vue";
import { universityProfileStep3InputMapper } from "@/api/mappers/universityProfileStep3InputMapper";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";
import { universityProfileStep3FormMapper } from "@/api/mappers/universityProfileStep3FormMapper";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    Field,
    ErrorMessage,
    FormSaveError,
    MatchdButton,
    SelectPillMultiple,
    SelectIconGroup,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
    MatchdField,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class UniversityStep3Form extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<UniversityProfileStep3Form>();
    const { value: branches } = useField<string[]>("branches");
    const { value: benefits } = useField<string[]>("benefits");

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.UNIVERSITY_ONBOARDING_STEP3,
            universityProfileStep3InputMapper(formData)
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
      branches,
      benefits,
    };
  });

  formData = {} as UniversityProfileStep3Form;

  get branches(): SelectPillMultipleItem[] {
    return this.$store.getters["branches"].map((branch) => {
      return {
        id: branch.id,
        name: branch.name,
        checked: !!this.veeForm.branches?.find(
          (selectedBranchId) => selectedBranchId === branch.id
        ),
      };
    });
  }

  get benefits(): SelectPillMultipleItem[] {
    return this.$store.getters["benefits"].map((benefit) => {
      return {
        ...benefit,
        checked: !!this.veeForm.benefits?.find(
          (selectedBenefitId) => selectedBenefitId === benefit.id
        ),
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

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get profileData(): UniversityProfileStep3Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as UniversityProfileStep3Form;
    }
    return universityProfileStep3FormMapper(user);
  }

  onChangeBranch(branch: Branch): void {
    const branchExists = !!this.veeForm.branches.find(
      (selectedBranchId) => selectedBranchId === branch.id
    );
    if (branchExists) {
      this.veeForm.branches = this.veeForm.branches.filter(
        (selectedBranchId) => selectedBranchId !== branch.id
      );
    } else {
      this.veeForm.branches = [...this.veeForm.branches, branch.id];
    }
  }

  onChangeBenefits(benefit: Benefit): void {
    const benefitExists = !!this.veeForm.benefits.find(
      (selectedBenefitId) => selectedBenefitId === benefit.id
    );
    if (benefitExists) {
      this.veeForm.benefits = this.veeForm.benefits.filter(
        (selectedBenefitId) => selectedBenefitId !== benefit.id
      );
    } else {
      this.veeForm.benefits = [...this.veeForm.benefits, benefit.id];
    }
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.BRANCHES),
      this.$store.dispatch(ContentActionTypes.BENEFITS),
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
