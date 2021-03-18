<template>
  <Form
    v-if="
      skills.length > 0 &&
        languages.length > 0 &&
        languageLevels.length > 0 &&
        expectations.length > 0
    "
    @submit="onSubmit"
    v-slot="{ errors }"
  >
    <SelectPillMultiple
      :options="expectations"
      @change="onChangeExpectations"
      name="expectations"
      class="mb-10"
    >
      <template v-slot:label>Allgemeine Anforderungen</template>
    </SelectPillMultiple>
    <GenericError v-if="jobPostingState.errors">
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
      ><template v-slot:label>Sprachskills*</template></LanguagePicker
    >
    <MatchdButton
      variant="outline"
      :disabled="jobPostingLoading"
      :loading="jobPostingLoading"
      class="block w-full"
      >Speichern und weiter</MatchdButton
    >
    <MatchdButton
      type="button"
      variant="outline"
      :disabled="jobPostingLoading"
      @click="onClickBack"
      class="block w-full mt-5"
      >Zurück zu Schritt 1</MatchdButton
    >
  </Form>
</template>

<script lang="ts">
import { jobPostingStep2InputMapper } from "@/api/mappers/jobPostingStep2InputMapper";
import GenericError from "@/components/GenericError.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { ExpectationWithStatus, JobPostingStep2Form } from "@/models/JobPostingStep2Form";
import { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import { ParamStrings } from "@/router/paramStrings";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { ExpectationType, SkillType } from "api";
import { ErrorMessage, Field, Form, FormActions } from "vee-validate";
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
    SelectPill,
    SelectPillMultiple,
    SelectPillGroup,
    LanguagePicker,
  },
})
export default class JobPostingStep2 extends Vue {
  form: JobPostingStep2Form = {
    skills: [],
    languages: [],
    expectations: [],
  };
  errors: { [k: string]: string } = {};

  filteredSkills: SkillType[] = [];
  skillInput = "";

  get currentJobPosting() {
    return this.$store.getters["currentJobPosting"];
  }

  get expectations(): ExpectationWithStatus[] {
    return this.$store.getters["expectations"].map(expectation => {
      return {
        ...expectation,
        checked: !!this.form.expectations.find(
          selectedExpectations => selectedExpectations.id === expectation.id
        ),
      };
    });
  }

  get skills() {
    return this.$store.getters["skills"];
  }

  get languages() {
    return this.$store.getters["languages"];
  }

  get languageLevels() {
    return this.$store.getters["languageLevels"];
  }

  get jobPostingLoading() {
    return this.$store.getters["jobPostingLoading"];
  }

  get jobPostingState() {
    return this.$store.getters["jobPostingState"];
  }

  onChangeExpectations(expectation: ExpectationType) {
    const expectationExists = !!this.form.expectations.find(
      selectedExpectation => selectedExpectation.id === expectation.id
    );
    if (expectationExists) {
      this.form.expectations = this.form.expectations.filter(
        selectedExpectation => selectedExpectation.id !== expectation.id
      );
    } else {
      this.form.expectations.push(expectation);
    }
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

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ContentActionsTypes.EXPECTATIONS),
      this.$store.dispatch(ContentActionsTypes.LANGUAGES, { shortList: true }),
      this.$store.dispatch(ContentActionsTypes.LANGUAGE_LEVELS),
      this.$store.dispatch(ContentActionsTypes.SKILLS),
    ]);

    if (this.currentJobPosting) {
      this.populateForm();
    }
  }

  populateForm() {
    this.form = {
      languages:
        this.currentJobPosting?.languages?.map(selectedLanguage => {
          return {
            language: selectedLanguage.language,
            level: selectedLanguage.languageLevel,
          };
        }) || [],
      skills:
        this.currentJobPosting?.skills.map(skill => {
          return {
            ...skill,
          };
        }) || [],
      expectations:
        this.currentJobPosting?.expectations.map(expectation => {
          return {
            ...expectation,
          };
        }) || [],
    };
  }

  onClickBack() {
    this.$router.push({ params: { step: `${ParamStrings.STEP}1` } });
  }

  async onSubmit(form: JobPostingStep2Form, actions: FormActions<Partial<JobPostingStep2Form>>) {
    if (this.currentJobPosting) {
      await this.$store.dispatch(
        ActionTypes.SAVE_JOBPOSTING_STEP2,
        jobPostingStep2InputMapper(this.currentJobPosting?.id, this.form)
      );
      if (this.jobPostingState.success) {
        this.$router.push({ params: { step: "schritt3", id: this.currentJobPosting?.id } });
      } else if (this.jobPostingState.errors) {
        actions.setErrors(this.jobPostingState.errors);
      }
    }
  }
}
</script>

<style></style>
