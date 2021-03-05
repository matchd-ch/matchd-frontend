<template>
  <Form v-if="companyAvatarUploadConfigurations" @submit="onSubmit" v-slot="{ errors }">
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="errors.website">
      <template v-slot:label>Website*</template>
      <Field
        id="website"
        name="website"
        as="input"
        label="Website"
        v-model="form.website"
        rules="required|url"
      />
    </MatchdField>
    <!-- Branch Field -->
    <SelectPillGroup :errors="errors.branchId" class="mb-10">
      <template v-slot:label>Branche</template>
      <template v-slot:field>
        <Field
          id="branchId"
          name="branchId"
          as="input"
          label="Branche"
          type="hidden"
          v-model="form.branchId"
        />
      </template>
      <SelectPill
        name="branchPill"
        v-for="branch in branches"
        :key="branch.id"
        :value="branch.id"
        :checked="branch.id === form.branchId"
        @change="form.branchId = $event"
        >{{ branch.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10">
      <template v-slot:label>Kurzbeschreibung unserer Unternehmung</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="1000"
        label="Das zeichnet mich sonst noch aus"
        v-model="form.description"
        class="h-72"
      />
      <template v-slot:info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <!-- Logo -->
    <MatchdFileBlock>
      <template v-slot:label>Logo</template>
      <MatchdFileView
        v-if="companyAvatar.length > 0 || companyAvatarQueue.length > 0"
        :files="companyAvatar"
        :queuedFiles="companyAvatarQueue"
        @deleteFile="onDeleteCompanyAvatar"
        class="mb-3"
      />
      <MatchdFileUpload
        v-if="companyAvatar.length === 0"
        :uploadConfiguration="companyAvatarUploadConfigurations"
        @selectFiles="onSelectCompanyAvatar"
        class="mb-10"
        >Logo auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <!-- Products & Services Field -->
    <MatchdField id="services" class="mb-10" :errors="errors.services">
      <template v-slot:label>Unsere Produkte und Services</template>
      <Field id="services" name="services" as="input" label="Services" v-model="form.services" />
    </MatchdField>
    <!-- ITrockt Field -->
    <MatchdToggle id="memberItStGallen" class="mb-10" :errors="errors.memberItStGallen">
      <template v-slot:label>Wir sind Mitglied im Verein IT St.Gallen "IT rockt!"</template>
      <input
        id="memberItStGallen"
        name="memberItStGallen"
        type="checkbox"
        v-model="form.memberItStGallen"
      />
    </MatchdToggle>

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
import { companyProfileStep2InputMapper } from "@/api/mappers/companyProfileStep2InputMapper";
import { AttachmentKey } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
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
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { AttachmentType, UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    GenericError,
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
export default class CompanyStep2 extends Vue {
  form: CompanyProfileStep2Form = {
    website: "",
    description: "",
    services: "",
    branchId: "",
    memberItStGallen: false,
  };

  get onboardingLoading() {
    return this.$store.getters["onboardingLoading"];
  }

  get onboardingState() {
    return this.$store.getters["onboardingState"];
  }

  get user(): UserWithProfileNode | null {
    return this.$store.getters["user"];
  }

  get companyAvatarQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get companyAvatar() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get companyAvatarUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar });
  }

  get branches() {
    return this.$store.getters["branches"];
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ActionTypes.COMPANY_ONBOARDING_STEP2_DATA),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
    ]);
  }

  async onSelectCompanyAvatar(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.CompanyAvatar,
      files,
    });
  }

  async onDeleteCompanyAvatar(file: AttachmentType) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.CompanyAvatar,
      id: file.id,
    });
  }

  async onSubmit(
    form: CompanyProfileStep2Form,
    actions: FormActions<Partial<CompanyProfileStep2Form>>
  ) {
    await this.$store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP2,
      companyProfileStep2InputMapper(this.form)
    );
    if (this.onboardingState.success) {
      this.$router.push({ params: { step: "schritt3" } });
    } else if (this.onboardingState.errors) {
      actions.setErrors(this.onboardingState.errors);
    }
  }
}
</script>

<style></style>
