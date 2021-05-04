<template>
  <Form v-if="branches.length > 0 && companyDocumentsUploadConfigurations" @submit="onSubmit">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- Branch Field -->
    <SelectPillMultiple :options="branches" @change="onChangeBranch" name="branches" class="mb-10">
      <template v-slot:label
        >In diesen Bereichen und Projekten kannst du bei uns tätig sein</template
      >
    </SelectPillMultiple>
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
        :class="{
          'mb-10': companyDocumentsUploadConfigurations.maxFiles < companyDocuments.length,
        }"
      />
      <MatchdFileUpload
        v-if="companyDocumentsUploadConfigurations.maxFiles >= companyDocuments.length"
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
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { BenefitWithStatus, CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import { OnboardingState } from "@/models/OnboardingState";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, Branch, Benefit, UploadConfiguration } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
    MatchdButton,
    SelectPillMultiple,
    SelectIconGroup,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
  },
})
export default class CompanyStep3 extends Vue {
  form: CompanyProfileStep3Form = {
    branches: [],
    benefits: [],
  };

  errors: { [k: string]: string } = {};

  get branches(): SelectPillMultipleItem[] {
    return this.$store.getters["branches"].map((branch) => {
      return {
        id: branch.id,
        name: branch.name,
        checked: !!this.form.branches.find((selectedBranch) => selectedBranch.id === branch.id),
      };
    });
  }

  get benefits(): BenefitWithStatus[] {
    return this.$store.getters["benefits"].map((benefit) => {
      return {
        ...benefit,
        checked: !!this.form.benefits.find((selectedBenefit) => selectedBenefit.id === benefit.id),
      };
    });
  }

  get onboardingLoading(): boolean {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get companyDocumentsQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocuments(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocumentsUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  onChangeBranch(branch: Branch): void {
    const branchExists = !!this.form.branches.find(
      (selectedBranches) => selectedBranches.id === branch.id
    );
    if (branchExists) {
      this.form.branches = this.form.branches.filter(
        (selectedBranches) => selectedBranches.id !== branch.id
      );
    } else {
      this.form.branches.push(branch);
    }
  }

  onChangeBenefits(benefit: Benefit): void {
    const benefitExists = !!this.form.benefits.find(
      (selectedBenefit) => selectedBenefit.id === benefit.id
    );
    if (benefitExists) {
      this.form.benefits = this.form.benefits.filter(
        (selectedBenefit) => selectedBenefit.id !== benefit.id
      );
    } else {
      this.form.benefits.push(benefit);
    }
  }

  async onSelectCompanyDocuments(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyDocuments,
      files,
    });
  }

  async onDeleteCompanyDocuments(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyDocuments,
      id: file.id,
    });
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.BRANCHES),
      this.$store.dispatch(ContentActionTypes.BENEFITS),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyDocuments,
      }),
    ]);
  }

  async onSubmit(
    form: CompanyProfileStep3Form,
    actions: FormActions<Partial<CompanyProfileStep3Form>>
  ): Promise<void> {
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
