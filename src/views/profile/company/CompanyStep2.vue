<template>
  <form v-if="profileData && companyAvatarUploadConfigurations" @submit="onSubmit">
    <FormSaveError v-if="showError" />
    <!-- Website Field -->
    <MatchdField id="website" class="mb-10" :errors="veeForm.errors.value.website">
      <template #label>Website</template>
      <Field id="website" name="website" as="input" label="Website" rules="url" />
    </MatchdField>
    <!-- Description Field -->
    <MatchdField id="description" class="mb-10">
      <template #label>Kurzsteckbrief Ihres Unternehmens</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        maxlength="3000"
        label="Kurzsteckbrief Ihres Unternehmens"
        rows="10"
      />
      <template #info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <!-- Logo -->
    <MatchdFileBlock class="mb-10">
      <template #label>Logo</template>
      <MatchdFileView
        v-if="companyAvatar.length > 0 || companyAvatarQueue.length > 0"
        :files="companyAvatar"
        :queued-files="companyAvatarQueue"
        @delete-file="onDeleteCompanyAvatar"
      />
      <MatchdFileUpload
        v-if="companyAvatar.length === 0"
        :upload-configuration="companyAvatarUploadConfigurations"
        :formal="true"
        @select-files="onSelectCompanyAvatar"
        >Logo auswählen</MatchdFileUpload
      >
      <template #info
        >Nur folgende Logos werden auf Matchd richtig dargestellt: quadratisches Format, Bild und
        Wortmarke dürfen nicht weiss sein, transparenter oder weisser Hintergrund.</template
      >
    </MatchdFileBlock>
    <!-- Products & Services Field -->
    <MatchdField id="services" class="mb-10" :errors="veeForm.errors.value.services">
      <template #label>Produkte, Services oder Dienstleistungen Ihres Unternehmens</template>
      <Field
        id="services"
        name="services"
        as="textarea"
        label="Produkte, Services oder Dienstleistungen Ihres Unternehmens"
        maxlength="1000"
        rows="10"
      />
      <template #info>Maximal 1000 Zeichen</template>
    </MatchdField>
    <!-- ITrockt Field -->
    <MatchdToggle
      id="memberItStGallen"
      class="mb-10"
      :errors="veeForm.errors.value.memberItStGallen"
    >
      <template #label>Ihr Unternehmen ist Mitglied im Verein IT St.Gallen «IT rockt!»</template>
      <input
        id="memberItStGallen"
        name="memberItStGallen"
        type="checkbox"
        value="true"
        :checked="veeForm.values.memberItStGallen"
        @change="onToggleMemberItStGallen(($event.target as HTMLInputElement).checked)"
      />
      <template v-if="veeForm.values.memberItStGallen" #value>
        <span class="text-pink-1">Ja</span>
      </template>
      <template v-else #value>Nein</template>
    </MatchdToggle>

    <template v-if="edit">
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="emit('clickCancel')"
          >
            Abbrechen
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="onboardingLoading"
            :loading="onboardingLoading"
            @click="onSubmit"
          >
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </template>
    <template v-else>
      <MatchdButton type="button" variant="outline" class="mr-4" @click="emit('clickBack')">
        Zurück
      </MatchdButton>
      <MatchdButton
        type="button"
        variant="fill"
        :disabled="onboardingLoading"
        :loading="onboardingLoading"
        @click="onSubmit"
      >
        Speichern und weiter
      </MatchdButton>
    </template>
  </form>
</template>

<script setup lang="ts">
import { companyProfileStep2FormMapper } from "@/api/mappers/companyProfileStep2FormMapper";
import { companyProfileStep2InputMapper } from "@/api/mappers/companyProfileStep2InputMapper";
import type { Attachment } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { CompanyProfileStep2Form } from "@/models/CompanyProfileStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, watch } from "vue";

withDefaults(defineProps<{ edit?: boolean }>(), { edit: false });

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();

const veeForm = useForm<CompanyProfileStep2Form>();

const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.COMPANY_ONBOARDING_STEP2,
      companyProfileStep2InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const onboardingState = computed(() => store.getters["onboardingState"]);
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const user = computed(() => store.getters["user"]);
const companyAvatarQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.CompanyAvatar })
);
const companyAvatar = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.CompanyAvatar })
);
const companyAvatarUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.CompanyAvatar })
);

const profileData = computed(() => {
  if (!user.value) {
    return {} as CompanyProfileStep2Form;
  }
  return companyProfileStep2FormMapper(user.value);
});

onMounted(async () => {
  await Promise.all([
    store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.CompanyAvatar }),
  ]);
  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onSelectCompanyAvatar = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.CompanyAvatar,
    files,
  });
};

const onDeleteCompanyAvatar = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.CompanyAvatar,
    id: file.id,
  });
};

const onToggleMemberItStGallen = (value: boolean) => {
  veeForm.values.memberItStGallen = value;
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
