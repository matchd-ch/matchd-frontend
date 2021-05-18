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
      <template v-slot:label>Technische Skills*</template>
      <input
        id="skills"
        type="text"
        autocomplete="off"
        v-model="skillInput"
        @input="onInputSkill"
        @keydown.enter.prevent="onPressEnterSkill"
        placeholder="Tippe, um Vorschläge zu erhalten"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="selectedSkills.length" class="mb-10">
      <SelectPill
        v-for="selectedSkill in selectedSkills"
        :key="selectedSkill.id"
        hasDelete="true"
        @remove="onRemoveSkill(selectedSkill)"
        >{{ selectedSkill.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Language Field -->
    <LanguagePicker
      class="mb-10"
      :languages="languages"
      :languageLevels="languageLevels"
      :selectedLanguages="veeForm.languages"
      :errors="veeForm.errors.languages"
      @clickAppendLanguage="onClickAppendLanguage"
      @clickRemoveLanguage="onClickRemoveLanguage"
      ><template v-slot:label>Sprachliche Skills*</template></LanguagePicker
    >
    <h2 class="text-heading-md mb-9">Was zeichnet dich sonst noch aus?</h2>
    <!-- Online Projects Field -->
    <MatchdField
      id="onlineProjects"
      class="mb-3"
      :class="{ 'mb-10': veeForm.onlineProjects?.length }"
    >
      <template v-slot:label>Deine Onlineprojekte</template>
      <input
        id="onlineProjects"
        type="text"
        v-model="onlineProjectInput"
        @keypress.enter.prevent="onAppendOnlineProject"
        placeholder="Github-URL, Unity-URL, etc."
      />
      <template v-slot:iconRight>
        <button
          type="button"
          class="h-full bg-primary-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
          :disabled="!isValidOnlineProjectUrl"
          @click="onAppendOnlineProject"
        >
          Hinzufügen
        </button>
      </template>
    </MatchdField>
    <SelectPillGroup v-if="veeForm.onlineProjects?.length" class="mb-10">
      <SelectPill
        v-for="onlineProject in veeForm.onlineProjects"
        :key="onlineProject.url"
        @remove="onRemoveOnlineProject(onlineProject)"
        hasDelete="true"
        >{{ onlineProject.url }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Certificates Field -->
    <MatchdFileBlock>
      <template v-slot:label>Deine Zeugnisse, Diplome und Zertifikate</template>
      <MatchdFileView
        v-if="studentDocuments.length > 0 || studentDocumentsQueue.length > 0"
        :files="studentDocuments"
        :queuedFiles="studentDocumentsQueue"
        class="mb-3"
        :class="{
          'mb-10': studentDocumentsUploadConfigurations.maxFiles <= studentDocuments.length,
        }"
        @deleteFile="onDeleteStudentDocument"
      />
      <MatchdFileUpload
        v-if="studentDocumentsUploadConfigurations.maxFiles > studentDocuments.length"
        :uploadConfiguration="studentDocumentsUploadConfigurations"
        @selectFiles="onSelectStudentDocuments"
        class="mb-10"
        >Hochladen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <!-- Hobbies Field -->
    <MatchdField id="hobbies" class="mb-3" :class="{ 'mb-10': veeForm.hobbies?.length === 0 }">
      <template v-slot:label>Deine Interessen und Hobbies</template>
      <input
        id="hobbies"
        type="text"
        name="hobbies"
        maxlength="100"
        v-model="hobbyInput"
        @keypress.enter.prevent="onAppendHobby"
        placeholder="Biken, Video Games, Kochen, etc."
      />
      <template v-slot:iconRight>
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
        @remove="onRemoveHobby(hobby)"
        hasDelete="true"
        >{{ hobby.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Distinction Field -->
    <MatchdField id="distinction" class="mb-10">
      <template v-slot:label>Dein Talent</template>
      <Field
        id="distinction"
        name="distinction"
        as="textarea"
        maxlength="1000"
        label="Das zeichnet mich sonst noch aus"
        v-model="veeForm.distinction"
        class="h-72"
        placeholder="4-5 Sätze zu deiner Spezialität"
      />
    </MatchdField>
    <slot />
  </form>
</template>

<script lang="ts">
import { studentProfileStep4FormMapper } from "@/api/mappers/studentProfileStep4FormMapper";
import { studentProfileStep4InputMapper } from "@/api/mappers/studentProfileStep4InputMapper";
import { AttachmentKey } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { isValidUrl } from "@/helpers/isValidUrl";
import { OnboardingState } from "@/models/OnboardingState";
import { SelectedLanguage, StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { QueuedFile } from "@/store/modules/upload/state";
import type {
  Attachment,
  HobbyInput,
  Language,
  LanguageLevel,
  OnlineProjectInput,
  Skill,
  UploadConfiguration,
} from "api";
import { Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import cloneDeep from "clone-deep";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdField,
    MatchdFileBlock,
    MatchdFileUpload,
    MatchdFileView,
    MatchdAutocomplete,
    SelectPillGroup,
    SelectPill,
    LanguagePicker,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class StudentStep4Form extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<StudentProfileStep4Form>();
    const { value: skills } = useField<string[]>("skills", (value: string[]) => {
      if (value?.length === 0) {
        return "Du musst mindestens einen technischen Skill auswählen.";
      }
      return true;
    });
    const { value: languages } = useField<SelectedLanguage[]>(
      "languages",
      (value: SelectedLanguage[]) => {
        if (value?.length === 0) {
          return "Du musst mindestens eine Sprache auswählen.";
        }
        return true;
      }
    );
    const { value: onlineProjects } = useField<OnlineProjectInput[]>("onlineProjects");
    const { value: hobbies } = useField<HobbyInput[]>("hobbies");

    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.STUDENT_ONBOARDING_STEP4,
            studentProfileStep4InputMapper(formData)
          );
          this.$emit("submitComplete", store.getters["onboardingState"]);
        } catch (e) {
          console.log(e);
        }
      }
    );

    return {
      ...form,
      onSubmit,
      hobbies,
      languages,
      onlineProjects,
      skills,
    };
  });

  filteredSkills: Skill[] = [];
  skillInput = "";
  onlineProjectInput = "";
  hobbyInput = "";

  get showError(): boolean {
    return !!this.onboardingState.errors;
  }

  get onboardingState(): OnboardingState {
    return this.$store.getters["onboardingState"];
  }

  get currentStep(): number | undefined {
    return this.$store.getters["profileStep"];
  }

  get skills(): Skill[] {
    return this.$store.getters["skills"];
  }

  get selectedSkills(): Skill[] {
    return this.skills.filter((skill) => this.veeForm.skills?.some((id) => id === skill.id));
  }

  get availableSkills(): Skill[] {
    return this.skills.filter((skill) => {
      return !this.veeForm.skills.some((id) => id === skill.id);
    });
  }

  get languages(): Language[] {
    return this.$store.getters["languages"];
  }

  get languageLevels(): LanguageLevel[] {
    return this.$store.getters["languageLevels"];
  }

  get isValidOnlineProjectUrl(): boolean {
    return this.onlineProjectInput.length > 0 && isValidUrl(this.onlineProjectInput);
  }

  get studentDocumentsQueue(): QueuedFile[] {
    return this.$store.getters["uploadQueueByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get studentDocuments(): Attachment[] {
    return this.$store.getters["attachmentsByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  get studentDocumentsUploadConfigurations(): UploadConfiguration | undefined {
    return this.$store.getters["uploadConfigurationByKey"]({ key: AttachmentKey.StudentDocuments });
  }

  async mounted(): Promise<void> {
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
      values: cloneDeep(this.profileData),
    });

    if (this.currentStep && this.currentStep > 4) {
      this.veeForm.setValues(cloneDeep(this.profileData));
    }
  }

  onInputSkill(): void {
    if (this.skillInput.length < 3) {
      this.filteredSkills = [];
      return;
    }
    this.filteredSkills = this.availableSkills.filter((item) =>
      item.name.toLowerCase().includes(this.skillInput.toLowerCase())
    );
  }

  onSelectSkill(skill: Skill): void {
    this.skillInput = "";
    this.veeForm.skills.push(skill.id);
    this.onInputSkill();
  }

  onPressEnterSkill(): void {
    if (this.filteredSkills.length === 1) {
      this.onSelectSkill(this.filteredSkills[0]);
    }
  }

  onRemoveSkill(skill: Skill): void {
    this.veeForm.skills = this.veeForm.skills.filter((id) => id !== skill.id);
  }

  onClickAppendLanguage(language: SelectedLanguage): void {
    if (language && language.level) {
      this.veeForm.languages.push(language);
    }
  }

  onClickRemoveLanguage(language: SelectedLanguage): void {
    this.veeForm.languages = this.veeForm.languages.filter(
      (selectedLanguage) => selectedLanguage.language !== language.language
    );
  }

  onAppendOnlineProject(): void {
    if (this.isValidOnlineProjectUrl) {
      this.veeForm.onlineProjects.push({ url: this.onlineProjectInput });
      this.onlineProjectInput = "";
    }
  }

  onRemoveOnlineProject(onlineProject: OnlineProjectInput): void {
    this.veeForm.onlineProjects = this.veeForm.onlineProjects.filter(
      (selectedOnlineProject) => selectedOnlineProject.url !== onlineProject.url
    );
  }

  onAppendHobby(): void {
    if (
      this.hobbyInput.length > 0 &&
      !this.veeForm.hobbies.find((hobby) => hobby.name === this.hobbyInput)
    ) {
      this.veeForm.hobbies.push({ name: this.hobbyInput });
      this.hobbyInput = "";
    }
  }

  onRemoveHobby(hobby: HobbyInput): void {
    this.veeForm.hobbies = this.veeForm.hobbies.filter(
      (selectedHobby) => selectedHobby.name !== hobby.name
    );
  }

  async onSelectStudentDocuments(files: FileList): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentDocuments,
      files,
    });
  }

  async onDeleteStudentDocument(file: Attachment): Promise<void> {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentDocuments,
      id: file.id,
    });
  }

  get profileData(): StudentProfileStep4Form {
    const user = this.$store.getters["user"];
    if (!user) {
      return {} as StudentProfileStep4Form;
    }
    return studentProfileStep4FormMapper(user);
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
