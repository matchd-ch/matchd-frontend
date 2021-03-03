<template>
  <Form
    v-if="
      skills.length > 0 &&
        languages.length > 0 &&
        languageLevels.length > 0 &&
        studentDocumentsUploadConfigurations
    "
    @submit="onSubmit"
  >
    <GenericError v-if="onboardingState.errors">
      Beim Speichern ist etwas schief gelaufen.
    </GenericError>
    <!-- Skills Field -->
    <MatchdAutocomplete
      id="skills"
      class="mb-3"
      :class="{ 'mb-10': form.skills.length === 0 }"
      :errors="errors.skills"
      :items="filteredSkills"
      @select="onSelectSkill"
    >
      <template v-slot:label>Technische Skills*</template>
      <Field
        id="skillInput"
        name="skillInput"
        as="input"
        autocomplete="off"
        label="Technische Skills"
        v-model="skillInput"
        @input="onInputSkill"
        @keydown.enter.prevent="onPressEnterSkill"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="form.skills.length > 0" class="mb-10">
      <SelectPill
        v-for="selectedSkill in form.skills"
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
      :selectedLanguages="form.languages"
      :errors="errors.languages"
      @clickAppendLanguage="onClickAppendLanguage"
      @clickRemoveLanguage="onClickRemoveLanguage"
      ><template v-slot:label>Diese Sprachen spreche ich*</template></LanguagePicker
    >
    <!-- Online Projects Field -->
    <MatchdField
      id="onlineProjects"
      class="mb-3"
      :class="{ 'mb-10': form.onlineProjects.length === 0 }"
    >
      <template v-slot:label>Verknüpfe deine Onlineprojekte</template>
      <Field
        id="onlineProjects"
        name="onlineProjects"
        as="input"
        label="Verknüpfe deine Onlineprojekte"
        v-model="onlineProjectInput"
        @keypress.enter.prevent="onAppendOnlineProject"
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
      <template v-if="form.onlineProjects.length === 0" v-slot:info
        >URLs zu deinen Projekten, z.B. auf Github / Unity</template
      >
    </MatchdField>
    <SelectPillGroup v-if="form.onlineProjects.length > 0" class="mb-10">
      <SelectPill
        v-for="onlineProject in form.onlineProjects"
        :key="onlineProject.url"
        @remove="onRemoveOnlineProject(onlineProject)"
        hasDelete="true"
        >{{ onlineProject.url }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Certificates Field -->
    <MatchdFileBlock>
      <template v-slot:label>Lade hier deine Zertifikate hoch</template>
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
        >Zertifikate auswählen</MatchdFileUpload
      >
    </MatchdFileBlock>
    <!-- Hobbies Field -->
    <MatchdField id="hobbies" class="mb-3" :class="{ 'mb-10': form.hobbies.length === 0 }">
      <template v-slot:label>Interessen & Hobbies</template>
      <Field
        id="hobbies"
        name="hobbies"
        as="input"
        label="Interessen & Hobbies"
        maxlength="100"
        v-model="hobbyInput"
        @keypress.enter.prevent="onAppendHobby"
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
    <SelectPillGroup v-if="form.hobbies.length > 0" class="mb-10">
      <SelectPill
        v-for="hobby in form.hobbies"
        :key="hobby.name"
        @remove="onRemoveHobby(hobby)"
        hasDelete="true"
        >{{ hobby.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Distinction Field -->
    <MatchdField id="distinction" class="mb-10">
      <template v-slot:label>Das zeichnet mich sonst noch aus</template>
      <Field
        id="distinction"
        name="distinction"
        as="textarea"
        maxlength="1000"
        label="Das zeichnet mich sonst noch aus"
        v-model="form.distinction"
        class="h-72"
      />
    </MatchdField>
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
import { AttachmentKey } from "@/api/models/types";
import GenericError from "@/components/GenericError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdFileBlock from "@/components/MatchdFileBlock.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import { isValidUrl } from "@/helpers/isValidUrl";
import { SelectedLanguage, StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { AttachmentType, SkillType, UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form } from "vee-validate";
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
    MatchdFileUpload,
    MatchdFileView,
    MatchdFileBlock,
    LanguagePicker,
    SelectPill,
    SelectPillGroup,
  },
})
export default class StudentStep4 extends Vue {
  form: StudentProfileStep4Form = {
    skills: [],
    languages: [],
    distinction: "",
    onlineProjects: [],
    hobbies: [],
  };
  errors: { [k: string]: string } = {};

  filteredSkills: SkillType[] = [];

  skillInput = "";
  onlineProjectInput = "";
  hobbyInput = "";

  get skills() {
    return this.$store.getters["skills"];
  }

  get languages() {
    return this.$store.getters["languages"];
  }

  get languageLevels() {
    return this.$store.getters["languageLevels"];
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

  get isValidOnlineProjectUrl() {
    return this.onlineProjectInput.length > 0 && isValidUrl(this.onlineProjectInput);
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
      this.$store.dispatch(ActionTypes.STUDENT_ONBOARDING_STEP4_DATA),
      this.$store.dispatch(UploadActionTypes.UPLOAD_CONFIGURATIONS),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, { key: AttachmentKey.StudentAvatar }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentDocuments,
      }),
    ]);
  }

  onInputSkill() {
    if (this.skillInput.length < 3) {
      this.filteredSkills = [];
      return;
    }
    this.filteredSkills = this.skills.filter(item =>
      item.name.toLowerCase().includes(this.skillInput.toLowerCase())
    );
  }

  onSelectSkill(skill: SkillType) {
    delete this.errors["skills"];
    this.skillInput = "";
    this.form.skills.push(skill);
    this.onInputSkill();
  }

  onPressEnterSkill() {
    if (this.filteredSkills.length === 1) {
      this.onSelectSkill(this.filteredSkills[0]);
    }
  }

  onRemoveSkill(skill: SkillType) {
    this.form.skills = this.form.skills.filter(selectedSkill => selectedSkill.id !== skill.id);
  }

  onClickAppendLanguage(language: SelectedLanguage) {
    if (language && language.level) {
      delete this.errors["languages"];
      this.form.languages.push(language);
    }
  }
  onClickRemoveLanguage(language: SelectedLanguage) {
    this.form.languages = this.form.languages.filter(
      selectedLanguage => selectedLanguage.language !== language.language
    );
  }

  onAppendOnlineProject() {
    if (this.isValidOnlineProjectUrl) {
      this.form.onlineProjects.push({ url: this.onlineProjectInput });
      this.onlineProjectInput = "";
    }
  }

  onRemoveOnlineProject(onlineProject: string) {
    this.form.onlineProjects = this.form.onlineProjects.filter(
      selectedOnlineProject => selectedOnlineProject !== onlineProject
    );
  }

  onAppendHobby() {
    if (this.hobbyInput.length > 0) {
      this.form.hobbies.push({ name: this.hobbyInput });
      this.hobbyInput = "";
    }
  }

  onRemoveHobby(hobby: string) {
    this.form.hobbies = this.form.hobbies.filter(selectedHobby => selectedHobby.name !== hobby);
  }

  async onSelectStudentDocuments(files: FileList) {
    await this.$store.dispatch(UploadActionTypes.UPLOAD_FILE, {
      key: AttachmentKey.StudentDocuments,
      files,
    });
  }

  async onDeleteStudentDocument(file: AttachmentType) {
    await this.$store.dispatch(UploadActionTypes.DELETE_FILE, {
      key: AttachmentKey.StudentDocuments,
      id: file.id,
    });
  }

  async onSubmit() {
    delete this.errors["skills"];
    delete this.errors["languages"];
    if (this.form.skills.length === 0) {
      this.errors["skills"] = "Bitte wähle mindestens einen Skill";
    }
    if (this.form.languages.length === 0) {
      this.errors["languages"] = "Bitte wähle mindestens eine Sprache";
    }

    if (this.form.skills.length > 0 && this.form.languages.length > 0) {
      await this.$store.dispatch(ActionTypes.STUDENT_ONBOARDING_STEP4, {
        skills: this.form.skills.map(skill => {
          return { id: skill.id };
        }),
        languages: this.form.languages.map(selectedLanguage => {
          return {
            language: selectedLanguage.language.id,
            languageLevel: selectedLanguage.level.id,
          };
        }),
        distinction: this.form.distinction,
        onlineProjects: this.form.onlineProjects,
        hobbies: this.form.hobbies,
      });

      if (this.onboardingState.success) {
        this.$router.push({ params: { step: "schritt5" } });
      }
    }
  }
}
</script>

<style></style>
