<template>
  <form v-if="profileData && companyAvatarUploadConfigurations" @submit="veeForm.onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="veeForm.errors.website">
      <template v-slot:label>Website*</template>
      <Field id="website" name="website" as="input" label="Website" rules="required|url" />
    </MatchdField>
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10">
      <template v-slot:label>Kurzsteckbrief Ihres Unternehmens</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="1000"
        label="Kurzsteckbrief Ihres Unternehmens"
        rows="10"
      />
      <template v-slot:info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <!-- Logo -->
    <MatchdFileBlock class="mb-10">
      <template v-slot:label>Logo</template>
      <MatchdFileView
        v-if="companyAvatar.length > 0 || companyAvatarQueue.length > 0"
        :files="companyAvatar"
        :queuedFiles="companyAvatarQueue"
        @deleteFile="onDeleteCompanyAvatar"
      />
      <MatchdFileUpload
        v-if="companyAvatar.length === 0"
        :uploadConfiguration="companyAvatarUploadConfigurations"
        :formal="true"
        @selectFiles="onSelectCompanyAvatar"
        >Logo auswählen</MatchdFileUpload
      >
      <template v-slot:info
        >Nur folgende Logos werden auf Matchd richtig dargestellt: quadratisches Format, Bild und
        Wortmarke dürfen nicht weiss sein, transparenter oder weisser Hintergrund.</template
      >
    </MatchdFileBlock>
    <!-- Products & Services Field -->
    <MatchdField id="services" class="mb-10" :errors="veeForm.errors.services">
      <template v-slot:label>Produkte, Services oder Dienstleistungen Ihres Unternehmens</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        label="Produkte, Services oder Dienstleistungen Ihres Unternehmens"
        maxlength="1000"
        rows="10"
      />
    </MatchdField>
    <!-- ITrockt Field -->
    <MatchdToggle id="memberItStGallen" class="mb-10" :errors="veeForm.errors.memberItStGallen">
      <template v-slot:label
        >Ihr Unternehmen ist Mitglied im Verein IT St.Gallen «IT rockt!»</template
      >
      <input
        id="memberItStGallen"
        name="memberItStGallen"
        type="checkbox"
        value="true"
        @change="onToggleMemberItStGallen($event.target.checked)"
        :checked="veeForm.memberItStGallen"
      />
    </MatchdToggle>

    <slot />
  </form>
</template>

<script lang="ts">
import { companyProfileStep2FormMapper } from "@/api/mappers/companyProfileStep2FormMapper";
import { companyProfileStep2InputMapper } from "@/api/mappers/companyProfileStep2InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";
import { OnboardingState } from "@/models/OnboardingState";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type { Attachment, UploadConfiguration, User } from "api";
import cloneDeep from "clone-deep";
import { ErrorMessage, Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    Field,
    ErrorMessage,
    FormSaveError,
    MatchdButton,
    MatchdToggle,
    MatchdField,
    MatchdSelect,
    MatchdFileBlock,
    MatchdFileView,
    MatchdFileUpload,
    SelectPillGroup,
    SelectPill,
  },
})
export default class CompanyStep2Form extends Vue {
  form = {} as CompanyProfileStep2Form;
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<CompanyProfileStep2Form>();
    const { value: memberItStGallen } = useField<boolean>("memberItStGallen");

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.COMPANY_ONBOARDING_STEP2,
            companyProfileStep2InputMapper(formData)
          );
          const onboardingState = store.getters["onboardingState"];
          this.$emit("submitComplete", onboardingState.success);
        } catch (e) {
          console.log(e); // todo
        }
      }
    );

    return {
      ...form,
      memberItStGallen,
      onSubmit,
    };
  });

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

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get companyAvatarQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get companyAvatar(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get companyAvatarUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get profileData(): CompanyProfileStep2Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as CompanyProfileStep2Form;
    }
    return companyProfileStep2FormMapper(user);
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
    ]);
    this.veeForm.resetForm({
      values: cloneDeep(this.profileData),
    });
    if (this.currentStep && this.currentStep > 2) {
      this.veeForm.setValues(cloneDeep(this.profileData));
    }
  }

  async onSelectCompanyAvatar(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyAvatar,
      files,
    });
  }

  async onDeleteCompanyAvatar(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyAvatar,
      id: file.id,
    });
  }

  onToggleMemberItStGallen(value: boolean): void {
    this.veeForm.memberItStGallen = value;
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
