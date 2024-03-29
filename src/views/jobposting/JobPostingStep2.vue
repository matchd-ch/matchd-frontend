<template>
  <div>
    <form
      v-if="
        skills.length > 0 &&
        languages.length > 0 &&
        languageLevels.length > 0 &&
        jobRequirements.length > 0
      "
      @submit="veeForm.onSubmit"
    >
      <FormSaveError v-if="jobPostingState.errors" />
      <!-- Bezeichnung Field -->
      <SelectPillMultiple
        :options="jobRequirements"
        name="jobRequirements"
        class="mb-10"
        @change="onChangeJobRequirement"
      >
        <template #label>Allgemeine Anforderungen</template>
      </SelectPillMultiple>
      <!-- Skills Field -->
      <MatchdAutocomplete
        id="skills"
        class="mb-3"
        :class="{ 'mb-10': veeForm.skills?.length === 0 }"
        :errors="veeForm.errors.skills"
        :items="filteredSkills"
        @select="onSelectSkill"
      >
        <template #label>Technische Skills*</template>
        <Field
          id="skillInput"
          v-model="skillInput"
          name="skillInput"
          as="input"
          autocomplete="off"
          label="Technische Skills"
          @input="onInputSkill"
          @keydown.enter.prevent="onPressEnterSkill"
        />
      </MatchdAutocomplete>
      <SelectPillGroup v-if="veeForm.skills?.length" class="mb-10">
        <SelectPill
          v-for="selectedSkill in selectedSkills"
          :key="selectedSkill.id"
          has-delete
          @remove="onRemoveSkill(selectedSkill)"
          >{{ selectedSkill.name }}</SelectPill
        >
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
        ><template #label>Sprachkenntnisse*</template></LanguagePicker
      >
      <teleport to="footer">
        <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
          <MatchdButton
            type="button"
            variant="outline"
            :disabled="jobPostingLoading"
            class="mb-2 xl:mr-4 xl:mb-0"
            @click="onClickBack"
          >
            <template v-if="currentJobPosting && currentJobPosting?.formStep > 3">
              Abbrechen
            </template>
            <template v-else>Zurück zu Schritt 1</template>
          </MatchdButton>
          <MatchdButton
            type="button"
            variant="fill"
            :disabled="jobPostingLoading"
            :loading="jobPostingLoading"
            @click="veeForm.onSubmit"
          >
            <template v-if="currentJobPosting && currentJobPosting.formStep > 3">
              Speichern
            </template>
            <template v-else>Speichern und weiter</template>
          </MatchdButton>
        </div>
      </teleport>
    </form>
  </div>
</template>

<script lang="ts">
import { jobPostingStep2FormMapper } from "@/api/mappers/jobPostingStep2FormMapper";
import { jobPostingStep2InputMapper } from "@/api/mappers/jobPostingStep2InputMapper";
import type { JobRequirement, Skill } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import LanguagePicker from "@/components/LanguagePicker.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import SelectPillMultiple from "@/components/SelectPillMultiple.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import type { JobPostingStep2Form } from "@/models/JobPostingStep2Form";
import type { SelectedLanguage } from "@/models/StudentProfileStep4Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { Field, useField, useForm } from "vee-validate";
import { Options, Vue, setup } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdSelect,
    MatchdAutocomplete,
    SelectPill,
    SelectPillMultiple,
    SelectPillGroup,
    LanguagePicker,
  },
  emits: ["submitComplete", "navigateBack", "changeDirty"],
})
export default class JobPostingStep2 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<JobPostingStep2Form>();
    const { value: skills } = useField<string[]>("skills", (value) => {
      if ((value as string[])?.length === 0) {
        return "Sie musst mindestens einen technischen Skill auswählen.";
      }
      return true;
    });
    const { value: languages } = useField<SelectedLanguage[]>("languages", (value) => {
      if ((value as SelectedLanguage[])?.length === 0) {
        return "Du musst mindestens eine Sprache auswählen.";
      }
      return true;
    });
    const { value: jobRequirements } = useField<string[]>("jobRequirements");
    const onSubmit = form.handleSubmit(async (formData): Promise<void> => {
      try {
        if (store.getters["currentJobPosting"]?.id) {
          await store.dispatch(
            ActionTypes.SAVE_JOBPOSTING_STEP2,
            jobPostingStep2InputMapper(store.getters["currentJobPosting"]?.id, formData),
          );
          const jobPostingState = store.getters["jobPostingState"];
          if (jobPostingState.success) {
            this.$emit("submitComplete");
          }
        }
      } catch (e) {
        console.log(e); // todo
      }
    });

    return {
      ...form,
      onSubmit,
      skills,
      languages,
      jobRequirements,
    };
  });
  formData = {} as JobPostingStep2Form;
  filteredSkills: Skill[] = [];
  skillInput = "";

  get jobPostingData() {
    if (!this.currentJobPosting) {
      return {} as JobPostingStep2Form;
    }
    return jobPostingStep2FormMapper(this.currentJobPosting);
  }

  get currentJobPosting() {
    return this.$store.getters["currentJobPosting"];
  }

  get jobRequirements() {
    return this.$store.getters["jobRequirements"].map((jobRequirement) => {
      return {
        ...jobRequirement,
        checked: !!this.veeForm.jobRequirements?.find(
          (selectedJobRequirementId) => selectedJobRequirementId === jobRequirement.id,
        ),
      };
    });
  }

  get skills() {
    return this.$store.getters["skills"];
  }

  get selectedSkills() {
    return this.skills.filter((skill) => this.veeForm.skills?.some((id) => id === skill.id));
  }

  get availableSkills() {
    return this.skills.filter((skill) => {
      return !this.veeForm.skills?.some((selectedSkillId) => selectedSkillId === skill.id);
    });
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

  onChangeJobRequirement(jobRequirement: JobRequirement) {
    const jobRequirementExists = !!this.veeForm.jobRequirements?.find(
      (selectedJobRequirementsId) => selectedJobRequirementsId === jobRequirement.id,
    );
    if (jobRequirementExists) {
      this.veeForm.jobRequirements = this.veeForm.jobRequirements?.filter(
        (selectedJobRequirementsId) => selectedJobRequirementsId !== jobRequirement.id,
      );
    } else {
      this.veeForm.jobRequirements = [...this.veeForm.jobRequirements, jobRequirement.id];
    }
  }

  onInputSkill() {
    if (this.skillInput.length < 1) {
      this.filteredSkills = [];
      return;
    }
    this.filteredSkills = this.availableSkills.filter((item) =>
      item.name.toLowerCase().startsWith(this.skillInput.toLowerCase()),
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
      this.veeForm.languages.push(language);
    }
  }

  onClickRemoveLanguage(language: SelectedLanguage) {
    this.veeForm.languages = this.veeForm.languages.filter(
      (selectedLanguage) => selectedLanguage.language !== language.language,
    );
  }

  async mounted() {
    await Promise.all([
      this.$store.dispatch(ContentActionsTypes.JOB_REQUIREMENTS),
      this.$store.dispatch(ContentActionsTypes.LANGUAGES, { shortList: true }),
      this.$store.dispatch(ContentActionsTypes.LANGUAGE_LEVELS),
      this.$store.dispatch(ContentActionsTypes.SKILLS),
    ]);

    this.veeForm.resetForm({
      values: this.jobPostingData,
    });
    calculateMargins();
  }

  onClickBack() {
    this.$emit("navigateBack");
  }

  @Watch("veeForm.meta.dirty")
  checkDirty() {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
