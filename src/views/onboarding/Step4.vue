<template>
  <Form
    v-if="skills.length > 0 && languages.length > 0 && languageLevels.length > 0"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <!-- Skills Field -->
    <MatchdAutocomplete
      id="skills"
      class="mb-3"
      :class="{ 'mb-10': form.skills.length === 0 }"
      :errors="errors.fieldOfStudy"
      :items="filteredSkills"
      @select="onSelectSkill"
    >
      <template v-slot:label>Technische Skills</template>
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
      @clickAppendLanguage="onClickAppendLanguage"
      @clickRemoveLanguage="onClickRemoveLanguage"
      ><template v-slot:label>Diese Sprachen spreche ich</template></LanguagePicker
    >
    <!-- Distinction Field -->
    <MatchdField id="distinction" class="mb-3" :class="{ 'mb-10': form.distinctions.length === 0 }">
      <template v-slot:label>Das zeichnet mich sonst noch aus</template>
      <Field
        id="distinction"
        name="distinction"
        as="input"
        label="Das zeichnet mich sonst noch aus"
        maxlength="100"
        v-model="distinctionInput"
        @keypress.enter.prevent="onAppendDistinction"
      />
      <template v-slot:iconRight>
        <button
          type="button"
          class="h-full bg-green-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
          :disabled="!distinctionInput"
          @click="onAppendDistinction"
        >
          Hinzufügen
        </button>
      </template>
      <template v-if="form.distinctions.length === 0" v-slot:info
        >Hast du dir etwas selber beigebracht? Zeichnet dich etwas speziell aus? Erzähle hier
        davon!</template
      >
    </MatchdField>
    <SelectPillGroup v-if="form.distinctions.length > 0" class="mb-10">
      <SelectPill
        v-for="distinction in form.distinctions"
        :key="distinction.text"
        @remove="onRemoveDistinction(distinction)"
        hasDelete="true"
        >{{ distinction.text }}</SelectPill
      >
    </SelectPillGroup>
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
          class="h-full bg-green-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
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
          class="h-full bg-green-1 text-white rounded-full flex justify-center items-center py-2 px-8 disabled:opacity-60"
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
    <MatchdButton
      variant="outline"
      :disabled="onboardingLoading"
      :loading="onboardingLoading"
      theme="neutral"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import { isValidUrl } from "@/helpers/isValidUrl";
import { SelectedLanguage, StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { SkillType, UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    Form,
    Field,
    ErrorMessage,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    MatchdAutocomplete,
    LanguagePicker,
    SelectPill,
    SelectPillGroup,
  },
})
export default class Step4 extends Vue {
  form: StudentProfileStep4Form = {
    skills: [],
    languages: [],
    distinctions: [],
    onlineProjects: [],
    hobbies: [],
  };

  filteredSkills: SkillType[] = [];

  skillInput = "";
  distinctionInput = "";
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
      this.form.languages.push(language);
    }
  }
  onClickRemoveLanguage(language: SelectedLanguage) {
    this.form.languages = this.form.languages.filter(
      selectedLanguage => selectedLanguage.language !== language.language
    );
  }

  onAppendDistinction() {
    if (this.distinctionInput.length > 0) {
      this.form.distinctions.push({ text: this.distinctionInput });
      this.distinctionInput = "";
    }
  }

  onRemoveDistinction(distinction: string) {
    this.form.distinctions = this.form.distinctions.filter(
      selectedDistinction => selectedDistinction.text !== distinction
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

  async mounted() {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP4_DATA);
  }

  async onSubmit() {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP4, {
      skills: this.form.skills.map(skill => {
        return { id: skill.id };
      }),
      languages: this.form.languages.map(selectedLanguage => {
        return {
          language: selectedLanguage.language.id,
          languageLevel: selectedLanguage.level.id,
        };
      }),
      distinctions: this.form.distinctions,
      onlineProjects: this.form.onlineProjects,
      hobbies: this.form.hobbies,
    });
    this.$router.push({ name: "OnboardingStep5" });
  }
}
</script>

<style></style>
