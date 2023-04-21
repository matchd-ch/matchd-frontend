<template>
  <form
    v-if="
      profileData &&
      skills.length &&
      languages.length &&
      languageLevels.length &&
      studentDocumentsUploadConfigurations
    "
    @submit="veeForm.onSubmit"
  >
    <FormSaveError v-if="showError" />
    <!-- Skills Field -->
    <MatchdAutocomplete
      id="skills"
      class="mb-3"
      :class="{ 'mb-10': veeForm.skills?.length === 0 }"
      :items="filteredSkills"
      :errors="veeForm.errors.skills"
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
        has-delete="true"
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
      :selected-languages="veeForm.languages"
      :errors="veeForm.errors.languages"
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

    <SelectPillGroup v-if="veeForm.onlineChallenges?.length" class="mb-10">
      <SelectPill
        v-for="onlineChallenge in veeForm.onlineChallenges"
        :key="onlineChallenge.url"
        has-delete="true"
        @remove="onRemoveOnlineChallenge(onlineChallenge)"
        >{{ onlineChallenge.url }}</SelectPill
      >
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
    <MatchdField id="hobbies" class="mb-3" :class="{ 'mb-10': veeForm.hobbies?.length === 0 }">
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
    <SelectPillGroup v-if="veeForm.hobbies?.length > 0" class="mb-10">
      <SelectPill
        v-for="hobby in veeForm.hobbies"
        :key="hobby.name"
        has-delete="true"
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
import { studentProfileStep4FormMapper } from "@/api/mappers/studentProfileStep4FormMapper";
import { studentProfileStep4InputMapper } from "@/api/mappers/studentProfileStep4InputMapper";
import type {
  Attachment,
  HobbyInput,
  OnlineChallengeInput,
  Skill,
  StudentProfileAbilitiesInput,
} from "@/api/models/types";
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
import { Field, useField, useForm } from "vee-validate";
import { Options, Vue, prop, setup } from "vue-class-component";
import { Watch } from "vue-property-decorator";

class Props {
  edit = prop<boolean>({ default: false });
}

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdFileBlock,
    MatchdFileUpload,
    MatchdFileView,
    MatchdAutocomplete,
    SelectPillGroup,
    SelectPill,
    LanguagePicker,
  },
  emits: ["submitComplete", "changeDirty", "clickCancel", "clickBack"],
})
export default class StudentStep4 extends Vue.with(Props) {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep4Form>();
    const { value: skills } = useField<string[]>("skills", (value) => {
      if ((value as string[])?.length === 0) {
        return "Du musst mindestens einen technischen Skill auswählen.";
      }
      return true;
    });
    const { value: languages } = useField<SelectedLanguage[]>("languages", (value) => {
      if ((value as SelectedLanguage[])?.length === 0) {
        return "Du musst mindestens eine Sprache auswählen.";
      }
      return true;
    });
    const { value: onlineChallenges } = useField<OnlineChallengeInput[]>("onlineChallenges");
    const { value: hobbies } = useField<HobbyInput[]>("hobbies");
    const { value: distinction } =
      useField<StudentProfileAbilitiesInput["distinction"]>("distinction");

    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        await store.dispatch(
          ActionTypes.STUDENT_ONBOARDING_STEP4,
          studentProfileStep4InputMapper(formData)
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
      hobbies,
      languages,
      onlineChallenges: onlineChallenges,
      skills,
      distinction,
    };
  });

  filteredSkills: Skill[] = [];
  skillInput = "";
  onlineChallengeInput = "";
  hobbyInput = "";

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

  get skills() {
    return this.$store.getters["skills"];
  }

  get selectedSkills() {
    return this.skills.filter((skill) => this.veeForm.skills?.some((id) => id === skill.id));
  }

  get availableSkills() {
    return this.skills.filter((skill) => {
      return !this.veeForm.skills.some((id) => id === skill.id);
    });
  }

  get languages() {
    return this.$store.getters["languages"];
  }

  get languageLevels() {
    return this.$store.getters["languageLevels"];
  }

  get isValidOnlineChallengeUrl() {
    return this.onlineChallengeInput.length > 0 && isValidUrl(this.onlineChallengeInput);
  }

  get studentDocumentsQueue() {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get studentDocuments() {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get studentDocumentsUploadConfigurations() {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ContentActionTypes.SKILLS),
      this.$store.dispatch(ContentActionTypes.LANGUAGES),
      this.$store.dispatch(ContentActionTypes.LANGUAGE_LEVELS),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentDocuments,
      }),
    ]);
    this.veeForm.resetForm({
      values: this.profileData,
    });

    calculateMargins();
  }

  onInputSkill() {
    if (this.skillInput.length < 1) {
      this.filteredSkills = [];
      return;
    }
    this.filteredSkills = this.availableSkills.filter((item) =>
      item.name.toLowerCase().startsWith(this.skillInput.toLowerCase())
    );
  }

  onSelectSkill(skill: Skill) {
    this.skillInput = "";
    this.veeForm.skills = [...this.veeForm.skills, skill.id];
    this.onInputSkill();
  }

  onPressEnterSkill() {
    if (this.filteredSkills.length === 1) {
      this.onSelectSkill(this.filteredSkills[0]);
    }
  }

  onRemoveSkill(skill: Skill) {
    this.veeForm.skills = this.veeForm.skills.filter((id) => id !== skill.id);
  }

  onClickAppendLanguage(language: SelectedLanguage) {
    if (language && language.level) {
      this.veeForm.languages = [...this.veeForm.languages, language];
    }
  }

  onClickRemoveLanguage(language: SelectedLanguage) {
    this.veeForm.languages = this.veeForm.languages.filter(
      (selectedLanguage) => selectedLanguage.language !== language.language
    );
  }

  onAppendOnlineChallenge() {
    if (this.isValidOnlineChallengeUrl) {
      this.veeForm.onlineChallenges = [
        ...this.veeForm.onlineChallenges,
        { url: this.onlineChallengeInput },
      ];
      this.onlineChallengeInput = "";
    }
  }

  onRemoveOnlineChallenge(onlineChallenge: OnlineChallengeInput) {
    this.veeForm.onlineChallenges = this.veeForm.onlineChallenges.filter(
      (selectedOnlineChallenge) => selectedOnlineChallenge.url !== onlineChallenge.url
    );
  }

  onAppendHobby() {
    if (
      this.hobbyInput.length > 0 &&
      !this.veeForm.hobbies.find((hobby) => hobby.name === this.hobbyInput)
    ) {
      this.veeForm.hobbies = [...this.veeForm.hobbies, { name: this.hobbyInput }];
      this.hobbyInput = "";
    }
  }

  onRemoveHobby(hobby: HobbyInput) {
    this.veeForm.hobbies = this.veeForm.hobbies.filter(
      (selectedHobby) => selectedHobby.name !== hobby.name
    );
  }

  async onSelectStudentDocuments(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentDocuments,
      files,
    });
  }

  async onDeleteStudentDocument(file: Attachment) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentDocuments,
      id: file.id,
    });
  }

  get profileData() {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep4Form;
    }
    return studentProfileStep4FormMapper(user);
  }

  @Watch("veeForm.meta.dirty")
  checkDirty() {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
