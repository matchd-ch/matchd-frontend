<template>
  <Form
    v-if="skills.length > 0 && languages.length > 0 && languageLevels.length > 0"
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <MatchdAutocomplete
      id="skills"
      class="mb-3"
      :class="{ 'mb-10': this.form.skills.length === 0 }"
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
    <SelectPillGroup v-if="this.form.skills.length > 0" class="mb-10">
      <SelectPill
        v-for="selectedSkill in this.form.skills"
        :key="selectedSkill.id"
        hasDelete="true"
        @remove="onRemoveSkill(selectedSkill)"
        >{{ selectedSkill.name }}</SelectPill
      >
    </SelectPillGroup>
    <LanguagePicker
      class="mb-10"
      :languages="languages"
      :levels="languageLevels"
      :selectedLanguages="form.languages"
      @clickAppendLanguage="onClickAppendLanguage"
      @clickRemoveLanguage="onClickRemoveLanguage"
      ><template v-slot:label>Diese Sprachen spreche ich</template></LanguagePicker
    >
    <!--    <MatchdField id="distinction" class="mb-10" :errors="errors.distinction">-->
    <!--      <template v-slot:label>Das zeichnet mich sonst noch aus</template>-->
    <!--      <Field-->
    <!--        id="distinction"-->
    <!--        name="hobby"-->
    <!--        as="textarea"-->
    <!--        label="Das zeichnet mich sonst noch aus"-->
    <!--        v-model="form.distinction"-->
    <!--      />-->
    <!--      <template v-slot:info-->
    <!--        >Hast du dir etwas selber beigebracht? Zeichnet dich etwas speziell aus? Erzähle hier-->
    <!--        davon!</template-->
    <!--      >-->
    <!--    </MatchdField>-->
    <MatchdField
      id="hobbies"
      class="mb-3"
      :class="{ 'mb-10': form.hobbies.length === 0 }"
      :errors="errors.hobbies"
    >
      <template v-slot:label>Interessen & Hobbies</template>
      <Field
        id="hobbies"
        name="hobbies"
        as="input"
        label="Interessen & Hobbies"
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
        :key="hobby"
        @remove="onRemoveHobby(hobby)"
        hasDelete="true"
        >{{ hobby }}</SelectPill
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
import { SelectedLanguage, StudentProfileStep4Form } from "@/models/StudentProfileStep4Form";
import { ActionTypes } from "@/store/modules/profile/action-types";
import { LanguageType, LevelType, SkillType, UserWithProfileNode } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
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
    distinction: "",
    hobbies: [],
    languages: [],
  };

  filteredSkills: SkillType[] = [];

  skillInput = "";
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

  get hobby() {
    return this.$store.getters["hobby"];
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

  onAppendHobby() {
    if (this.hobbyInput.length > 0) {
      this.form.hobbies.push(this.hobbyInput);
      this.hobbyInput = "";
    }
  }

  onRemoveHobby(hobby: string) {
    this.form.hobbies = this.form.hobbies.filter(selectedHobby => selectedHobby !== hobby);
  }

  async mounted() {
    await this.$store.dispatch(ActionTypes.ONBOARDING_STEP4_DATA);
  }

  async onSubmit(form: StudentProfileStep4Form, actions: FormActions<StudentProfileStep4Form>) {
    // await this.$store.dispatch(ActionTypes.ONBOARDING_STEP3, {
    //   ...form,
    // });
    this.$router.push({ name: "OnboardingStep5" });
  }
}
</script>

<style></style>
