<template>
  <form v-if="branches.length && companyDocumentsUploadConfigurations" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
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
    <!-- Media -->
    <MatchdFileBlock>
      <template v-slot:label>Bilder und Videos Ihres Unternehmens und Ihres Teams</template>
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
        v-if="companyDocumentsUploadConfigurations.maxFiles > companyDocuments.length"
        :formal="true"
        :uploadConfiguration="companyDocumentsUploadConfigurations"
        @selectFiles="onSelectCompanyDocuments"
        class="mb-10"
        >Fotos oder Videos auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
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
import { companyProfileStep3FormMapper } from "@/api/mappers/companyProfileStep3FormMapper";
import { companyProfileStep3InputMapper } from "@/api/mappers/companyProfileStep3InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectIconGroup from "@/components/SelectIconGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { SelectPillMultipleItem } from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { CompanyProfileStep3Form } from "@/models/CompanyProfileStep3Form";
import { OnboardingState } from "@/models/OnboardingState";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, Branch, Benefit, UploadConfiguration } from "api";
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
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class CompanyStep3Form extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<CompanyProfileStep3Form>();
    const { value: branches } = useField<string[]>("branches");
    const { value: benefits } = useField<string[]>("benefits");

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        await store.dispatch(
          ActionTypes.COMPANY_ONBOARDING_STEP3,
          companyProfileStep3InputMapper(formData)
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

  formData = {} as CompanyProfileStep3Form;

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

  get companyDocumentsQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocuments(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get companyDocumentsUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyDocuments });
  }

  get profileData(): CompanyProfileStep3Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as CompanyProfileStep3Form;
    }
    return companyProfileStep3FormMapper(user);
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
