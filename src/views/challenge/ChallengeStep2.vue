<template>
  <div
    v-if="
      currentChallenge &&
      challengeImagesUploadConfigurations &&
      challengeDocumentsUploadConfigurations
    "
  >
    <form @submit="onSubmit">
      <FormSaveError v-if="challengeState.errors" />
      <!-- Website Field -->
      <MatchdField
        v-if="!isStudent"
        id="website"
        class="mb-10"
        :errors="veeForm.errors.value.website"
      >
        <template #label>Website</template>
        <Field id="website" name="website" as="input" label="Website" rules="url" />
        <template #info>Link zu mehr Informationen auf Ihrer Webseite.</template>
      </MatchdField>
      <!-- Starttermin -->
      <MatchdSelect
        id="challengeDateFrom"
        class="mb-10 grow"
        :errors="
          veeForm.errors.value.challengeFromDateMonth || veeForm.errors.value.challengeFromDateYear
        "
      >
        <template #label>Starttermin</template>
        <fieldset id="challengeDateFrom" class="flex">
          <Field
            id="challengeFromDateMonth"
            name="challengeFromDateMonth"
            as="select"
            label="Starttermin Monat"
            class="mr-3"
          >
            <option value disabled selected hidden>Monat</option>
            <option v-for="n in 12" :key="`challengeFromDateMonth_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
          <Field
            id="challengeFromDateYear"
            name="challengeFromDateYear"
            as="select"
            label="Starttermin Jahr"
          >
            <option value disabled selected hidden>Jahr</option>
            <option v-for="n in validYears" :key="`challengeFromDateYear_${n}`" :value="n">
              {{ String(n).padStart(2, "0") }}
            </option>
          </Field>
        </fieldset>
      </MatchdSelect>
      <!-- Logo -->
      <MatchdFileBlock class="mb-10">
        <template #label>Bilder zur Challenge</template>
        <MatchdFileView
          v-if="challengeImages.length > 0 || challengeImagesQueue.length > 0"
          :files="challengeImages"
          :queued-files="challengeImagesQueue"
          class="mb-3"
          :class="{
            'mb-10': challengeImagesUploadConfigurations.maxFiles < challengeImagesQueue.length,
          }"
          @delete-file="onDeleteChallengeImages"
        />
        <MatchdFileUpload
          v-if="challengeImagesUploadConfigurations.maxFiles > challengeImages.length"
          :upload-configuration="challengeImagesUploadConfigurations"
          :formal="!isStudent"
          @select-files="onSelectChallengeImages"
        >
          Bilder auswählen
        </MatchdFileUpload>
      </MatchdFileBlock>
      <!-- Media -->
      <MatchdFileBlock>
        <template #label>Dokumente zur Challenge</template>
        <MatchdFileView
          v-if="challengeDocuments.length > 0 || challengeDocumentsQueue.length > 0"
          :files="challengeDocuments"
          :queued-files="challengeDocumentsQueue"
          class="mb-3"
          :class="{
            'mb-10': challengeDocumentsUploadConfigurations.maxFiles < challengeDocuments.length,
          }"
          @delete-file="onDeleteChallengeDocuments"
        />
        <MatchdFileUpload
          v-if="challengeDocumentsUploadConfigurations.maxFiles > challengeDocuments.length"
          :formal="!isStudent"
          :upload-configuration="challengeDocumentsUploadConfigurations"
          class="mb-10"
          @select-files="onSelectChallengeDocuments"
          >Dokumente auswählen</MatchdFileUpload
        >
      </MatchdFileBlock>
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            :disabled="challengeLoading"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="onClickBack"
          >
            <template v-if="currentChallenge?.formStep > 2">Abbrechen</template>
            <template v-else>Zurück zu Schritt 1</template>
          </MatchdButton>
          <MatchdButton type="button" variant="fill" :disabled="challengeLoading" @click="onSubmit">
            Speichern
          </MatchdButton>
        </div>
      </teleport>
    </form>
  </div>
</template>

<script setup lang="ts">
import { challengeStep2FormMapper } from "@/api/mappers/challengeStep2FormMapper";
import type { Attachment } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import MatchdButton from "@/components/MatchdButton.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ChallengeStep2Form } from "@/models/ChallengeStep2Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/challenge/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { MutationTypes as UploadMutationTypes } from "@/store/modules/upload/mutation-types";
import { Field, Form, useForm } from "vee-validate";
import { computed, onBeforeMount, onMounted, watch } from "vue";
import FormSaveError from "../../components/FormSaveError.vue";
import MatchdField from "../../components/MatchdField.vue";
import MatchdFileBlock from "../../components/MatchdFileBlock.vue";
import MatchdFileUpload from "../../components/MatchdFileUpload.vue";
import MatchdFileView from "../../components/MatchdFileView.vue";
import MatchdSelect from "../../components/MatchdSelect.vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "navigateBack"): void;
}>();

const store = useStore();
const veeForm = useForm<ChallengeStep2Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    if (!store.getters["currentChallenge"]?.id) {
      return;
    }
    await store.dispatch(ActionTypes.SAVE_CHALLENGE_STEP2, {
      id: store.getters["currentChallenge"].id,
      ...(formData.website && { website: formData.website }),
      ...(formData.challengeFromDateMonth &&
        formData.challengeFromDateYear && {
          challengeFromDate: `${formData.challengeFromDateMonth}.${formData.challengeFromDateYear}`,
        }),
    });
    const challengeState = store.getters["challengeState"];
    if (!challengeState.success && challengeState.errors) {
      if (challengeState.errors?.challengeFromDate) {
        veeForm.setErrors({ challengeFromDateMonth: "Stellenantritt darf nicht leer sein." });
        return;
      }
      veeForm.setErrors(challengeState.errors);
      return;
    }
    emits("submitComplete", challengeState.success);
  } catch (e) {
    console.log(e);
  }
});

const currentChallenge = computed(() => store.getters["currentChallenge"]);

const challengeData = computed(() => {
  if (!currentChallenge.value) {
    return {} as ChallengeStep2Form;
  }
  return challengeStep2FormMapper(currentChallenge.value);
});

const isStudent = computed(() => store.getters["isStudent"]);
const challengeLoading = computed(() => store.getters["challengeLoading"]);
const challengeState = computed(() => store.getters["challengeState"]);

const validYears = computed(() => {
  const currentYear = new Date().getFullYear();
  const maxYear = currentYear + 10;
  const validYears = [];
  for (let i = currentYear; maxYear > i; i++) {
    validYears.push(i);
  }
  return validYears;
});

const user = computed(() => store.getters["user"]);
const challengeImagesQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.ChallengeImages })
);
const challengeImages = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.ChallengeImages })
);

const challengeImagesUploadConfigurations = computed(() => {
  return store.getters["uploadConfigurationByKey"]({
    key: AttachmentKey.ChallengeImages,
  });
});

const challengeDocumentsQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.ChallengeDocuments })
);

const challengeDocuments = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.ChallengeDocuments })
);

const challengeDocumentsUploadConfigurations = computed(() => {
  return store.getters["uploadConfigurationByKey"]({
    key: AttachmentKey.ChallengeDocuments,
  });
});

const onSelectChallengeImages = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_CHALLENGE_FILE, {
    key: AttachmentKey.ChallengeImages,
    files,
    id: currentChallenge.value?.id ?? "",
  });
};

const onDeleteChallengeImages = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_CHALLENGE_FILE, {
    key: AttachmentKey.ChallengeImages,
    id: file.id,
    challengeId: currentChallenge.value?.id ?? "",
  });
};

const onSelectChallengeDocuments = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_CHALLENGE_FILE, {
    key: AttachmentKey.ChallengeDocuments,
    files,
    id: currentChallenge.value?.id ?? "",
  });
};

const onDeleteChallengeDocuments = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_CHALLENGE_FILE, {
    key: AttachmentKey.ChallengeDocuments,
    id: file.id,
    challengeId: currentChallenge.value?.id ?? "",
  });
};

const onClickBack = () => {
  emits("navigateBack");
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);

onBeforeMount(() => {
  store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
    key: AttachmentKey.ChallengeImages,
  });
  store.commit(UploadMutationTypes.CLEAR_FILES_FOR_KEY, {
    key: AttachmentKey.ChallengeDocuments,
  });
});

onMounted(async () => {
  await store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS);
  if (currentChallenge.value) {
    await Promise.all([
      store.dispatch(UploadActionTypes.UPLOADED_CHALLENGE_FILES, {
        key: AttachmentKey.ChallengeImages,
        id: currentChallenge.value.id ?? "",
      }),
      store.dispatch(UploadActionTypes.UPLOADED_CHALLENGE_FILES, {
        key: AttachmentKey.ChallengeFallback,
        id: currentChallenge.value.id ?? "",
      }),
      store.dispatch(UploadActionTypes.UPLOADED_CHALLENGE_FILES, {
        key: AttachmentKey.ChallengeDocuments,
        id: currentChallenge.value.id ?? "",
      }),
    ]);
  }
  veeForm.resetForm({
    values: challengeData.value,
  });
  calculateMargins();
});
</script>
