<template>
  <form v-if="topics.length && projectTypes.length" @submit="veeForm.onSubmit">
    <FormSaveError v-if="projectPostingState.errors" />
    <p v-if="!hasProjectPostings" class="mb-14">
      <template v-if="isStudent"
        >Erfasse hier deine Ideen für eine Bachelor-, Master- oder Projektarbeit und Matchd zeigt
        dir Projekte von Unternehmen, die dazu passen.<br /><br />
        Keine konkrete Idee? Dann fülle vorerst nur die Pflichtfelder aus und lass Matchd passende
        Projekte für dich finden.
      </template>
      <template v-else
        >Erfassen Sie hier Ihre Ideen und Herausforderungen für fachwissenschaftlich und
        anwendungsorientiert Projektarbeiten.<br /><br />Matchd zeigt Ihnen Projektideen von
        Studierenden, die dazu passen.
      </template>
    </p>
    <!-- Art der Projektarbeit Field -->
    <SelectPillGroup :errors="veeForm.errors.projectTypeId" class="mb-10">
      <template v-slot:label>Art der Projektarbeit*</template>
      <template v-slot:field>
        <Field
          id="projectTypeId"
          name="projectTypeId"
          as="input"
          label="Art der Projektarbeit"
          type="hidden"
          rules="required"
        />
      </template>
      <SelectPill
        name="projectTypePill"
        v-for="option in projectTypes"
        :key="option.id"
        :value="option.id"
        :checked="option.id === veeForm.values?.projectTypeId"
        @change="onChangeProjectType"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.title">
      <template v-slot:label>Beschriftung*</template>
      <Field
        id="title"
        name="title"
        as="input"
        label="Beschriftung"
        rules="required"
        maxlength="50"
      />
    </MatchdField>
    <!-- Themengebiet Field -->
    <SelectPillGroup :errors="veeForm.errors.topicId" class="mb-10">
      <template v-slot:label>Themengebiet*</template>
      <template v-slot:field>
        <Field
          id="topicId"
          name="topicId"
          as="input"
          label="Themengebiet"
          type="hidden"
          rules="required"
        />
      </template>
      <SelectPill
        name="topicPill"
        v-for="option in topics"
        :key="option.id"
        :value="option.id"
        :checked="option.id === veeForm.values?.topicId"
        @change="onChangeTopic"
        >{{ option.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Stichworte Field -->
    <MatchdAutocomplete
      id="keywords"
      class="mb-3"
      :class="{ 'mb-10': veeForm.keywords?.length === 0 }"
      :items="filteredKeywords"
      :errors="veeForm.errors.keywords"
      @select="onSelectKeyword"
    >
      <template v-slot:label>Stichworte*</template>
      <input
        id="keywords"
        type="text"
        autocomplete="off"
        v-model="keywordInput"
        @input="onInputKeyword"
        @keydown.enter.prevent="onPressEnterKeyword"
        placeholder="Tippen für Vorschläge"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="selectedKeywords.length" class="mb-10">
      <SelectPill
        v-for="selectedKeyword in selectedKeywords"
        :key="selectedKeyword.id"
        hasDelete="true"
        @remove="onRemoveKeyword(selectedKeyword)"
        >{{ selectedKeyword.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Beschreibung Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.description">
      <template v-slot:label>Beschreibung des Themenschwerpunktes*</template>
      <Field
        id="description"
        name="description"
        as="textarea"
        label="Beschreibung des Themenschwerpunktes"
        maxlength="300"
        rules="required"
        class="h-72"
      />
    </MatchdField>
    <!-- Problemstellung Field -->
    <MatchdField
      id="additionalInformation"
      class="mb-10"
      :errors="veeForm.errors.additionalInformation"
    >
      <template v-slot:label>Problemstellung und zu behandelnde Fragen</template>
      <Field
        id="additionalInformation"
        name="additionalInformation"
        as="textarea"
        label="Problemstellung und zu behandelnde Fragen"
        maxlength="1000"
        class="h-72"
      />
    </MatchdField>
    <teleport to="footer">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          :disabled="projectPostingLoading"
          class="mb-2 xl:mr-4 xl:mb-0"
          @click="$router.push({ name: 'Dashboard' })"
        >
          Abbrechen
        </MatchdButton>
        <MatchdButton
          type="button"
          variant="fill"
          :disabled="projectPostingLoading"
          :loading="projectPostingLoading"
          @click="veeForm.onSubmit"
        >
          <template v-if="currentProjectPosting?.formStep > 2">Speichern</template>
          <template v-else>Speichern und weiter</template>
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script lang="ts">
import { projectPostingStep1FormMapper } from "@/api/mappers/projectPostingStep1FormMapper";
import { projectPostingStep1InputMapper } from "@/api/mappers/projectPostingStep1InputMapper";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingState } from "@/models/ProjectPostingState";
import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import type { ProjectPosting as ProjectPostingType, ProjectType, User, Keyword, Topic } from "api";
import { Field, useField, useForm } from "vee-validate";
import { Options, setup, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Options({
  components: {
    Field,
    FormSaveError,
    MatchdButton,
    MatchdField,
    MatchdAutocomplete,
    MatchdSelect,
    MatchdToggle,
    SelectPill,
    SelectPillGroup,
  },
  emits: ["submitComplete", "changeDirty"],
})
export default class ProjectPostingStep1 extends Vue {
  veeForm = setup(() => {
    const store = useStore();
    const form = useForm<ProjectPostingStep1Form>();
    const { value: keywords } = useField<string[]>("keywords");
    const onSubmit = form.handleSubmit(
      async (formData): Promise<void> => {
        try {
          await store.dispatch(
            ActionTypes.SAVE_PROJECTPOSTING_STEP1,
            projectPostingStep1InputMapper(store.getters["currentProjectPosting"]?.id, formData)
          );
          const projectPostingState = store.getters["projectPostingState"];
          if (projectPostingState.success) {
            this.$emit("submitComplete");
          }
        } catch (e) {
          console.log(e); // todo
        }
      }
    );

    return {
      ...form,
      onSubmit,
      keywords,
    };
  });
  formData = {} as ProjectPostingStep1Form;
  filteredKeywords: Keyword[] = [];
  keywordInput = "";

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get currentProjectPosting(): ProjectPostingType | null {
    return this.$store.getters["currentProjectPosting"];
  }

  get projectPostingData(): ProjectPostingStep1Form {
    return projectPostingStep1FormMapper(this.currentProjectPosting);
  }

  get keywords(): Keyword[] {
    return this.$store.getters["keywords"];
  }

  get selectedKeywords(): Keyword[] {
    return this.keywords.filter((keyword) =>
      this.veeForm.keywords?.some((id) => id === keyword.id)
    );
  }

  get availableKeywords(): Keyword[] {
    return this.keywords.filter((keyword) => {
      return !this.veeForm.keywords.some((id) => id === keyword.id);
    });
  }

  get hasProjectPostings(): boolean {
    return !!this.$store.getters["projectPostings"].length;
  }

  get projectTypes(): ProjectType[] {
    return this.$store.getters["projectTypes"];
  }

  get topics(): Topic[] {
    return this.$store.getters["topics"];
  }

  get projectPostingLoading(): boolean {
    return this.$store.getters["projectPostingLoading"];
  }

  get projectPostingState(): ProjectPostingState {
    return this.$store.getters["projectPostingState"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  async mounted(): Promise<void> {
    await Promise.all([
      this.$store.dispatch(ContentActionsTypes.KEYWORDS),
      this.$store.dispatch(ContentActionsTypes.PROJECT_TYPES),
      this.$store.dispatch(ContentActionsTypes.TOPICS),
      this.$store.dispatch(ContentActionsTypes.PROJECT_POSTINGS),
    ]);

    this.veeForm.resetForm({
      values: this.projectPostingData,
    });
    calculateMargins();
  }

  onInputKeyword(): void {
    if (this.keywordInput.length < 1) {
      this.filteredKeywords = [];
      return;
    }
    this.filteredKeywords = this.availableKeywords.filter((item) =>
      item.name.toLowerCase().startsWith(this.keywordInput.toLowerCase())
    );
  }

  onSelectKeyword(keyword: Keyword): void {
    this.keywordInput = "";
    this.veeForm.keywords = [...this.veeForm.keywords, keyword.id];
    this.onInputKeyword();
  }

  onPressEnterKeyword(): void {
    if (this.filteredKeywords.length === 1) {
      this.onSelectKeyword(this.filteredKeywords[0]);
    }
  }

  onRemoveKeyword(keyword: Keyword): void {
    this.veeForm.keywords = this.veeForm.keywords.filter((id) => id !== keyword.id);
  }

  onChangeProjectType(projectTypeId: string): void {
    this.veeForm.setFieldValue("projectTypeId", projectTypeId);
  }

  onChangeTopic(topicId: string): void {
    this.veeForm.setFieldValue("topicId", topicId);
  }

  @Watch("veeForm.meta.dirty")
  checkDirty(): void {
    this.$emit("changeDirty", this.veeForm.meta.dirty);
  }
}
</script>

<style></style>
