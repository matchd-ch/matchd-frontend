<template>
  <form
    v-if="
      profileData &&
      skills.length &&
      languages.length &&
      languageLevels.length &&
      studentDocumentsUploadConfigurations
    "
    @submit="onSubmit"
  >
    <FormSaveError v-if="showError" />
    <!-- Skills Field -->
    <MatchdAutocomplete
      id="skills"
      class="mb-3"
      :class="{ 'mb-10': veeForm.values.skills?.length === 0 }"
      :items="filteredSkills"
      :errors="veeForm.errors.value.skills"
      @select="onSelectSkill"
    >
      <template #label>Technische Skills*</template>
      <input
        id="skills"
        v-model="skillInput"
        type="text"
        autocomplete="off"
        placeholder="Tippe für Vorschläge"
        @input="onInputSkill"
        @keydown.enter.prevent="onPressEnterSkill"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="selectedSkills.length" class="mb-10">
      <SelectPill
        v-for="selectedSkill in selectedSkills"
        :key="selectedSkill.id"
        has-delete
        @remove="onRemoveSkill(selectedSkill)"
      >
        {{ selectedSkill.name }}
      </SelectPill>
    </SelectPillGroup>
    <!-- Language Field -->
    <LanguagePicker
      class="mb-10"
      :languages="languages"
      :language-levels="languageLevels"
      :selected-languages="veeForm.values.languages"
      :errors="veeForm.errors.value.languages"
      @click-append-language="onClickAppendLanguage"
      @click-remove-language="onClickRemoveLanguage"
    >
      <template #label>Sprachkenntnisse*</template>
    </LanguagePicker>
    <!-- Online Challenges Field -->
    <MatchdField id="onlineChallenges" class="mb-10">
      <template #label>Deine Onlinechallenges</template>
      <input
        id="onlineChallenges"
        v-model="onlineChallengeInput"
        type="text"
        placeholder="Github-URL, Unity-URL, etc."
        @keypress.enter.prevent="onAppendOnlineChallenge"
      />
      <template #iconRight>
        <button
          type="button"
          class="h-full bg-primary-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
          :disabled="!isValidOnlineChallengeUrl"
          @click="onAppendOnlineChallenge"
        >
          Hinzufügen
        </button>
      </template>
      <template v-if="!isValidOnlineChallengeUrl" #info
        >Bitte gib die URL in folgendem Format ein: http://matchd.ch oder
        https://matchd.ch</template
      >
    </MatchdField>

    <SelectPillGroup v-if="veeForm.values.onlineChallenges?.length" class="mb-10">
      <SelectPill
        v-for="(onlineChallenge, index) in veeForm.values.onlineChallenges"
        :key="onlineChallenge.url ?? `onlineChallenge_url_${index}`"
        has-delete
        @remove="onRemoveOnlineChallenge(onlineChallenge)"
      >
        {{ onlineChallenge.url }}
      </SelectPill>
    </SelectPillGroup>
    <!-- Certificates Field -->
    <MatchdFileBlock>
      <template #label>Deine Zeugnisse, Diplome und Zertifikate</template>
      <MatchdFileView
        v-if="studentDocuments.length > 0 || studentDocumentsQueue.length > 0"
        :files="studentDocuments"
        :queued-files="studentDocumentsQueue"
        class="mb-3"
        :class="{
          'mb-10': studentDocumentsUploadConfigurations.maxFiles <= studentDocuments.length,
        }"
        @delete-file="onDeleteStudentDocument"
      />
      <MatchdFileUpload
        v-if="studentDocumentsUploadConfigurations.maxFiles > studentDocuments.length"
        :upload-configuration="studentDocumentsUploadConfigurations"
        class="mb-10"
        @select-files="onSelectStudentDocuments"
        >Hochladen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <!-- Hobbies Field -->
    <MatchdField
      id="hobbies"
      class="mb-3"
      :class="{ 'mb-10': veeForm.values.hobbies?.length === 0 }"
    >
      <template #label>Deine Interessen und Hobbies</template>
      <input
        id="hobbies"
        v-model="hobbyInput"
        type="text"
        name="hobbies"
        maxlength="100"
        placeholder="Biken, Video Games, Kochen, etc."
        @keypress.enter.prevent="onAppendHobby"
      />
      <template #iconRight>
        <button
          type="button"
          class="h-full bg-primary-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
          :disabled="!hobbyInput"
          @click="onAppendHobby"
        >
          Hinzufügen
        </button>
      </template>
    </MatchdField>
    <SelectPillGroup v-if="veeForm.values.hobbies?.length > 0" class="mb-10">
      <SelectPill
        v-for="(hobby, index) in veeForm.values.hobbies"
        :key="hobby.name ?? `hobby_name_${index}`"
        has-delete
        @remove="onRemoveHobby(hobby)"
      >
        {{ hobby.name }}
      </SelectPill>
    </SelectPillGroup>
    <!-- Distinction Field -->
    <MatchdField id="distinction" class="mb-10">
      <template #label>Dein Talent</template>
      <Field
        id="distinction"
        v-model="veeForm.values.distinction"
        name="distinction"
        as="textarea"
        maxlength="3000"
        label="Das zeichnet mich sonst noch aus"
        class="h-72"
        placeholder="4-5 Sätze zu deiner Spezialität"
      />
    </MatchdField>
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
import { studentProfileStep4FormMapper } from "@/api/mappers/studentProfileStep4FormMapper";
import { studentProfileStep4InputMapper } from "@/api/mappers/studentProfileStep4InputMapper";
import type { Attachment, HobbyInput, OnlineChallengeInput, Skill } from "@/api/models/types";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { isValidUrl } from "@/helpers/isValidUrl";
import {
  type SelectedLanguage,
  type StudentProfileStep4Form,
} from "@/models/StudentProfileStep4Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";

withDefaults(
  defineProps<{
    edit?: boolean;
  }>(),
  {
    edit: false,
  }
);

const emit = defineEmits<{
  (event: "submitComplete", onboardingState: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
  (event: "clickBack"): void;
}>();

const store = useStore();
const veeForm = useForm<StudentProfileStep4Form>();
const onSubmit = veeForm.handleSubmit(async (formData): Promise<void> => {
  try {
    await store.dispatch(
      ActionTypes.STUDENT_ONBOARDING_STEP4,
      studentProfileStep4InputMapper(formData)
    );
    const onboardingState = store.getters["onboardingState"];
    emit("submitComplete", onboardingState.success);
  } catch (e) {
    console.log(e);
  }
});

const filteredSkills = ref<Skill[]>([]);
const skillInput = ref("");
const onlineChallengeInput = ref("");
const hobbyInput = ref("");
const showError = computed(() => !!onboardingState.value.errors);
const onboardingLoading = computed(() => store.getters["onboardingLoading"]);
const onboardingState = computed(() => store.getters["onboardingState"]);
const user = computed(() => store.getters["user"]);
const skills = computed(() => store.getters["skills"]);

const selectedSkills = computed(() =>
  skills.value.filter((skill) => veeForm.values.skills?.some((id) => id === skill.id))
);

const availableSkills = computed(() => {
  return skills.value.filter((skill) => {
    return !veeForm.values.skills?.some((id) => id === skill.id);
  });
});

const languages = computed(() => store.getters["languages"]);
const languageLevels = computed(() => store.getters["languageLevels"]);
const isValidOnlineChallengeUrl = computed(
  () => onlineChallengeInput.value.length > 0 && isValidUrl(onlineChallengeInput.value)
);
const studentDocumentsQueue = computed(() =>
  store.getters["uploadQueueByKey"]({ key: AttachmentKey.StudentDocuments })
);
const studentDocuments = computed(() =>
  store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments })
);
const studentDocumentsUploadConfigurations = computed(() =>
  store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentDocuments })
);

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionTypes.SKILLS),
    store.dispatch(ContentActionTypes.LANGUAGES),
    store.dispatch(ContentActionTypes.LANGUAGE_LEVELS),
    store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.StudentDocuments,
    }),
  ]);
  veeForm.resetForm({
    values: profileData.value,
  });
  calculateMargins();
});

const onInputSkill = () => {
  if (skillInput.value.length < 1) {
    filteredSkills.value = [];
    return;
  }
  filteredSkills.value = availableSkills.value.filter((item) =>
    item.name.toLowerCase().startsWith(skillInput.value.toLowerCase())
  );
};

const onSelectSkill = (skill: Skill) => {
  skillInput.value = "";
  veeForm.setFieldValue("skills", [...veeForm.values.skills, skill.id]);
  onInputSkill();
};

const onPressEnterSkill = () => {
  if (filteredSkills.value.length === 1) {
    onSelectSkill(filteredSkills.value[0]);
  }
};

const onRemoveSkill = (skill: Skill) => {
  veeForm.values.skills = veeForm.values.skills.filter((id) => id !== skill.id);
};

const onClickAppendLanguage = (language: SelectedLanguage) => {
  if (language && language.level) {
    veeForm.values.languages = [...veeForm.values.languages, language];
  }
};

const onClickRemoveLanguage = (language: SelectedLanguage) => {
  veeForm.values.languages = veeForm.values.languages.filter(
    (selectedLanguage) => selectedLanguage.language !== language.language
  );
};

const onAppendOnlineChallenge = () => {
  if (isValidOnlineChallengeUrl.value) {
    veeForm.values.onlineChallenges = [
      ...veeForm.values.onlineChallenges,
      { url: onlineChallengeInput.value },
    ];
    onlineChallengeInput.value = "";
  }
};

const onRemoveOnlineChallenge = (onlineChallenge: OnlineChallengeInput) => {
  veeForm.values.onlineChallenges = veeForm.values.onlineChallenges.filter(
    (selectedOnlineChallenge) => selectedOnlineChallenge.url !== onlineChallenge.url
  );
};

const onAppendHobby = () => {
  if (
    hobbyInput.value.length > 0 &&
    !veeForm.values.hobbies.find((hobby) => hobby.name === hobbyInput.value)
  ) {
    veeForm.values.hobbies = [...veeForm.values.hobbies, { name: hobbyInput.value }];
    hobbyInput.value = "";
  }
};

const onRemoveHobby = (hobby: HobbyInput) => {
  veeForm.values.hobbies = veeForm.values.hobbies.filter(
    (selectedHobby) => selectedHobby.name !== hobby.name
  );
};

const onSelectStudentDocuments = async (files: FileList) => {
  await store.dispatch(UploadActionTypes.UPLOAD_FILE, {
    key: AttachmentKey.StudentDocuments,
    files,
  });
};

const onDeleteStudentDocument = async (file: Attachment) => {
  await store.dispatch(UploadActionTypes.DELETE_FILE, {
    key: AttachmentKey.StudentDocuments,
    id: file.id,
  });
};

const profileData = computed(() => {
  if (!user.value) {
    return {} as StudentProfileStep4Form;
  }
  return studentProfileStep4FormMapper(user.value);
});

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emit("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
