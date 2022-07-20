<template>
  <form v-if="projectTypes.length" @submit="onSubmit">
    <FormSaveError v-if="projectPostingState.errors" />
    <p v-if="!hasProjectPostings" class="mb-14">
      <template v-if="isStudent">
        Erfasse hier deine Ideen für eine Bachelor-, Master- oder Projektarbeit und Matchd zeigt dir
        Projekte von Unternehmen, die dazu passen.<br /><br />
        Keine konkrete Idee? Dann fülle vorerst nur die Pflichtfelder aus und lass Matchd passende
        Projekte für dich finden.
      </template>
      <template v-else>
        Erfassen Sie hier Ihre Ideen und Herausforderungen für fachwissenschaftliche und
        anwendungsorientierte Projektarbeiten.<br /><br />Matchd zeigt Ihnen Projektideen von
        Studierenden, die dazu passen.
      </template>
    </p>
    <!-- Art der Projektarbeit Field -->
    <SelectPillGroup :errors="veeForm.errors.value.projectTypeId" class="mb-10">
      <template #label>Art der Projektarbeit*</template>
      <template #field>
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
        v-for="option in projectTypes"
        :key="option.id"
        name="projectTypePill"
        :value="option.id"
        :checked="option.id === veeForm.values?.projectTypeId"
        @change="onChangeProjectType"
      >
        {{ option.name }}
      </SelectPill>
    </SelectPillGroup>
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.value.title">
      <template #label>Projekttitel*</template>
      <Field
        id="title"
        name="title"
        as="input"
        label="Beschriftung"
        rules="required"
        maxlength="50"
      />
    </MatchdField>
    <MatchdAutocomplete
      id="keywords"
      class="mb-3"
      :class="{ 'mb-10': veeForm.values.keywords?.length === 0 }"
      :items="filteredKeywords"
      :errors="veeForm.errors.value.keywords"
      @select="onSelectKeyword"
    >
      <template #label>Stichwörter*</template>
      <input
        id="keywords"
        v-model="keywordInput"
        type="text"
        autocomplete="off"
        placeholder="Tippen für Vorschläge"
        @input="onInputKeyword"
        @keydown.enter.prevent="onPressEnterKeyword"
      />
    </MatchdAutocomplete>
    <SelectPillGroup v-if="selectedKeywords.length" class="mb-10">
      <SelectPill
        v-for="selectedKeyword in selectedKeywords"
        :key="selectedKeyword.id"
        :has-delete="true"
        @remove="onRemoveKeyword(selectedKeyword)"
        >{{ selectedKeyword.name }}</SelectPill
      >
    </SelectPillGroup>
    <!-- Beschreibung Field -->
    <MatchdField id="description" class="mb-10" :errors="veeForm.errors.value.description">
      <template #label>Beschreibung des Themenschwerpunktes*</template>
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
    <MatchdSelect id="teamSize" class="mb-10" :errors="veeForm.errors.value.teamSize">
      <template #label>Teamgrösse*</template>
      <Field id="teamSize" name="teamSize" as="select" label="Teamgrösse" rules="required">
        <option value="1">1 Person</option>
        <option value="2">max. 2 Personen</option>
        <option value="4">max. 4 Personen</option>
        <option value="6">max. 6 Personen</option>
      </Field>
    </MatchdSelect>
    <MatchdField id="compensation" class="mb-10" :errors="veeForm.errors.value.compensation">
      <template #label>Vergütung*</template>
      <Field
        id="compensation"
        name="compensation"
        as="textarea"
        label="Vergütung"
        maxlength="300"
        class="h-72"
        rules="required"
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
          @click="onSubmit"
        >
          <template v-if="currentProjectPosting?.formStep && currentProjectPosting.formStep > 2">
            Speichern
          </template>
          <template v-else>Speichern und weiter</template>
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script setup lang="ts">
import { projectPostingStep1FormMapper } from "@/api/mappers/projectPostingStep1FormMapper";
import type { Keyword } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ProjectPostingStep1Form } from "@/models/ProjectPostingStep1Form";
import { useStore } from "@/store";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { ActionTypes } from "@/store/modules/projectposting/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";
import MatchdSelect from "../../components/MatchdSelect.vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
}>();

const store = useStore();

const veeForm = useForm<ProjectPostingStep1Form>();
const onSubmit = veeForm.handleSubmit(async (formData) => {
  console.log("formData:", formData);
  try {
    await store.dispatch(ActionTypes.SAVE_PROJECTPOSTING_STEP1, {
      id: store.getters["currentProjectPosting"]?.id || null,
      title: formData.title,
      description: formData.description,
      projectType: {
        id: formData.projectTypeId,
      },
      compensation: formData.compensation,
      teamSize: formData.teamSize,
      keywords: formData.keywords.map((id) => ({
        id: id,
      })),
    });
    const projectPostingState = store.getters["projectPostingState"];
    emits("submitComplete", projectPostingState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const filteredKeywords = ref<Keyword[]>([]);
const keywordInput = ref("");

const isStudent = computed(() => store.getters["isStudent"]);
const currentProjectPosting = computed(() => store.getters["currentProjectPosting"]);
const projectPostingData = computed(() =>
  projectPostingStep1FormMapper(currentProjectPosting.value)
);
const keywords = computed(() => store.getters["keywords"]);

const selectedKeywords = computed(() => {
  return keywords.value.filter((keyword) =>
    veeForm.values.keywords?.some((id) => id === keyword.id)
  );
});

const availableKeywords = computed(() => {
  return keywords.value.filter((keyword) => {
    return !veeForm.values.keywords.some((id) => id === keyword.id);
  });
});

const hasProjectPostings = computed(() => !!store.getters["projectPostings"].length);
const projectTypes = computed(() => store.getters["projectTypes"]);
const projectPostingLoading = computed(() => store.getters["projectPostingLoading"]);
const projectPostingState = computed(() => store.getters["projectPostingState"]);

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionsTypes.KEYWORDS),
    store.dispatch(ContentActionsTypes.PROJECT_TYPES),
    store.dispatch(ContentActionsTypes.PROJECT_POSTINGS),
  ]);

  veeForm.resetForm({
    values: projectPostingData.value,
  });
  calculateMargins();
});

const onInputKeyword = () => {
  if (keywordInput.value.length < 1) {
    filteredKeywords.value = [];
    return;
  }
  filteredKeywords.value = availableKeywords.value.filter((item) =>
    item.name.toLowerCase().startsWith(keywordInput.value.toLowerCase())
  );
};

const onSelectKeyword = (keyword: Keyword) => {
  keywordInput.value = "";
  veeForm.values.keywords = [...veeForm.values.keywords, keyword.id];
  onInputKeyword();
};

const onPressEnterKeyword = () => {
  if (filteredKeywords.value.length === 1) {
    onSelectKeyword(filteredKeywords.value[0]);
  }
};

const onRemoveKeyword = (keyword: Keyword) => {
  veeForm.values.keywords = veeForm.values.keywords.filter((id) => id !== keyword.id);
};

const onChangeProjectType = (projectTypeId: string) => {
  veeForm.setFieldValue("projectTypeId", projectTypeId);
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
