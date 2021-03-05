<template>
  <Form v-if="jobPositions.length > 0" @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- JobPosition Field -->
    <MatchdAutocomplete
      id="jobPositionInput"
      class="mb-3"
      :class="{ 'mb-10': form.jobPositions.length === 0 }"
      :errors="errors.jobPosition"
      :items="filteredJobPositions"
      @select="onSelectJobPosition"
    >
      <template v-slot:label
        >In diesen Bereichen und Projekten kannst du bei uns tätig sein</template
      >
      <Field
        id="jobPositionInput"
        name="jobPositionInput"
        as="input"
        autocomplete="off"
        label="In diesen Bereichen und Projekten kannst du bei uns tätig sein"
        v-model="jobPositionInput"
        @input="onInputJobPositions"
        @keydown.enter.prevent="onPressEnterJobPosition"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="form.jobPositions.length > 0" class="mb-10">
      <SelectPill
        v-for="selectedJobPosition in form.jobPositions"
        :key="selectedJobPosition.id"
        hasDelete="true"
        @remove="onRemoveJobPosition(selectedJobPosition)"
        >{{ selectedJobPosition.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Benefits Field -->
    <SelectIconGroup class="mb-10" :icons="benefits" name="benefits" @change="onChangeBenefits">
      <template v-slot:label>Das erwartet dich bei uns</template>
    </SelectIconGroup>
    <!-- Media -->
    <MatchdFileBlock>
      <template v-slot:label>So sieht es bei uns aus</template>
      <MatchdFileView
        v-if="companyDocuments.length > 0 || companyDocumentsQueue.length > 0"
        :files="companyDocuments"
        :queuedFiles="companyDocumentsQueue"
        @deleteFile="onDeleteCompanyDocuments"
        class="mb-3"
      />
      <MatchdFileUpload
        v-if="companyDocuments.length === 0"
        :uploadConfiguration="companyDocumentsUploadConfigurations"
        @selectFiles="onSelectCompanyDocuments"
        class="mb-10"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { companyProfileStep3InputMapper } from "@/api/mappers/companyProfileStep3InputMapper";
import { AttachmentKey } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { BenefitWithStatus, CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { AttachmentType, BenefitType, JobPositionType, UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    MatchdAutocomplete,
    SelectPill,
    SelectPillGroup,
    SelectIconGroup,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
  },
})
export default class CompanyStep3 extends Vue {
  form: CompanyProfileStep3Form = {
    jobPositions: [],
    benefits: [],
  };

  jobPositionInput = "";
  filteredJobPositions: JobPositionType[] = [];
  errors: { [k: string]: string } = {};

  get jobPositions() {
    return this.$store.getters["jobPositions"];
  }

  get benefits(): BenefitWithStatus[] {
    return this.$store.getters["benefits"].map(benefit => {
      return {
        ...benefit,
        checked: !!this.form.benefits.find(selectedBenefit => selectedBenefit.id === benefit.id),
      };
    });
  }

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  get companyDocumentsQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocuments() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocumentsUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  onInputJobPositions() {
    if (this.jobPositionInput.length < 3) {
      this.filteredJobPositions = [];
      return;
    }
    this.filteredJobPositions = this.jobPositions.filter(item =>
      item.name.toLowerCase().includes(this.jobPositionInput.toLowerCase())
    );
  }

  onPressEnterJobPosition() {
    if (this.filteredJobPositions.length === 1) {
      this.onSelectJobPosition(this.filteredJobPositions[0]);
    }
  }

  onSelectJobPosition(jobPosition: JobPositionType) {
    delete this.errors["jobPositions"];
    this.jobPositionInput = "";
    this.form.jobPositions.push(jobPosition);
    this.onInputJobPositions();
  }

  onRemoveJobPosition(jobPosition: JobPositionType) {
    this.form.jobPositions = this.form.jobPositions.filter(
      selectedSkill => selectedSkill.id !== jobPosition.id
    );
  }

  onChangeBenefits(benefit: BenefitType) {
    const benefitExists = !!this.form.benefits.find(
      selectedBenefit => selectedBenefit.id === benefit.id
    );
    if (benefitExists) {
      this.form.benefits = this.form.benefits.filter(
        selectedBenefit => selectedBenefit.id !== benefit.id
      );
    } else {
      this.form.benefits.push(benefit);
    }
  }

  async onSelectCompanyDocuments(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyDocuments,
      files,
    });
  }

  async onDeleteCompanyDocuments(file: AttachmentType) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyDocuments,
      id: file.id,
    });
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ActionTypes.COMPANY_ONBOARDING_STEP3_DATA),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyDocuments,
      }),
    ]);
  }

  async onSubmit(
    form: CompanyProfileStep3Form,
    actions: FormActions<Partial<CompanyProfileStep3Form>>
  ) {
    await this.$store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP3,
      companyProfileStep3InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt4" } });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
    }
  }
}
</script>

<style></style>
