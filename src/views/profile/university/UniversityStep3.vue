<template>
  <form v-if="branches.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Link Education Field -->
    <MatchdField id="linkEducation" class="mb-10" :errors="veeForm.errors.linkEducation">
      <template #label>Wissenswertes zur Aus- und Weiterbildung</template>
      <Field
        id="linkEducation"
        name="linkEducation"
        as="input"
        label="Wissenswertes zur Aus- und Weiterbildung"
        rules="url"
      />
    </MatchdField>
    <!-- Link Challenges Field -->
    <MatchdField id="linkChallenges" class="mb-10" :errors="veeForm.errors.linkChallenges">
      <template #label>Wissenswertes zum Thema Praxisprojekte</template>
      <Field
        id="linkChallenges"
        name="linkChallenges"
        as="input"
        label="Wissenswertes zum Thema Praxisprojekte"
        rules="url"
      />
    </MatchdField>
    <!-- Link Thesis Field -->
    <MatchdField id="linkThesis" class="mb-10" :errors="veeForm.errors.linkThesis">
      <template #label>Wissenswertes zur Thema Abschlussarbeiten</template>
      <Field
        id="linkThesis"
        name="linkThesis"
        as="input"
        label="Wissenswertes zur Thema Abschlussarbeiten"
        rules="url"
      />
    </MatchdField>
    <!-- Description Field -->
    <MatchdField id="services" class="mb-10" :errors="veeForm.errors.services">
      <template #label>Unser Angebot</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        maxlength="300"
        label="Services"
        class="h-72"
      />
      <template #info>Maximal 300 Zeichen</template>
    </MatchdField>
    <!-- Branch Field -->
    <SelectPillMultiple
      :options="branches"
      name="branches"
      class="mb-10"
      :errors="veeForm.errors.branches"
      @change="onChangeBranch"
    >
      <template #label
        >In diesen Bereichen und Challenges können Talente bei Ihnen tätig werden</template
      >
    </SelectPillMultiple>
    <!-- Benefits Field -->
    <SelectIconGroup class="mb-10" :icons="benefits" name="benefits" @change="onChangeBenefits">
      <template #label>Das erwartet dich bei uns</template>
    </SelectIconGroup>

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
import { universityProfileStep3FormMapper } from "@/api/mappers/universityProfileStep3FormMapper";
import { universityProfileStep3InputMapper } from "@/api/mappers/universityProfileStep3InputMapper";
import type { Benefit, Branch } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { UniversityProfileStep3Form } from "@/models/UniversityProfileStep3Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ErrorMessage, Field, useField, useForm } from "vee-validate";
import { Options, prop, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

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

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
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
    });

    return {
      ...form,
      onSubmit,
      branches,
      benefits,
    };
  });

  formData = {} as UniversityProfileStep3Form;

  get branches() {
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

  get benefits() {
    return this.$store.getters["benefits"].map((benefit) => {
      return {
        ...benefit,
        checked: !!this.veeForm.benefits?.find(
          (selectedBenefitId) => selectedBenefitId === benefit.id
        ),
      };
    });
  }

  get showError() {
    return !!this.onboardingState.errors;
  }

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get currentStep() {
    return this.$store.getters["profileStep"];
  }

  get profileData() {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as UniversityProfileStep3Form;
    }
    return universityProfileStep3FormMapper(user);
  }

  onChangeBranch(branch: Branch) {
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

  onChangeBenefits(benefit: Benefit) {
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

  async mounted() {
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
  checkDirty() {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>
<style></style>
