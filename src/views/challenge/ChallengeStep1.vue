<template>
  <form v-if="challengeTypes.length" @submit="onSubmit">
    <FormSaveError v-if="challengeState.errors" />
    <p v-if="!hasChallenges" class="mb-14">
      <template v-if="isStudent">
        Erfasse hier deine Ideen für eine Bachelor-, Master- oder Projektarbeit und Matchd zeigt dir
        Challenges von Unternehmen, die dazu passen.<br /><br />
        Keine konkrete Idee? Dann fülle vorerst nur die Pflichtfelder aus und lass Matchd passende
        Challenges für dich finden.
      </template>
      <template v-else>
        Erfassen Sie hier Ihre Ideen und Herausforderungen für fachwissenschaftliche und
        anwendungsorientierte Projektarbeiten.<br /><br />Matchd zeigt Ihnen Challengeideen von
        Studierenden, die dazu passen.
      </template>
    </p>
    <!-- Art der Challenge Field -->
    <SelectPillGroup :errors="veeForm.errors.value.challengeTypeId" class="mb-10">
      <template #label>Art*</template>
      <template #field>
        <Field
          id="challengeTypeId"
          name="challengeTypeId"
          as="input"
          label="Art"
          type="hidden"
          rules="required"
        />
      </template>
      <SelectPill
        v-for="option in challengeTypes"
        :key="option.id"
        name="challengeTypePill"
        :value="option.id"
        :checked="option.id === veeForm.values?.challengeTypeId"
        @change="onChangeChallengeType"
      >
        {{ option.name }}
      </SelectPill>
    </SelectPillGroup>
    <!-- Bezeichnung Field -->
    <MatchdField id="title" class="mb-10" :errors="veeForm.errors.value.title">
      <template #label>Titel*</template>
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
        maxlength="3000"
        rules="required"
        class="h-72"
      />
    </MatchdField>
    <MatchdSelect id="teamSize" class="mb-10" :errors="veeForm.errors.value.teamSize">
      <template #label>Teamgrösse*</template>
      <Field id="teamSize" name="teamSize" as="select" label="Teamgrösse" rules="required">
        <option v-for="size in getDefaultTeamSizes()" :key="size.value" :value="size.value">
          {{ size.label }}
        </option>
      </Field>
    </MatchdSelect>
    <MatchdField id="compensation" class="mb-10" :errors="veeForm.errors.value.compensation">
      <template #label>Vergütung*</template>
      <Field
        id="compensation"
        name="compensation"
        as="textarea"
        label="Vergütung"
        maxlength="3000"
        class="h-72"
        rules="required"
      />
    </MatchdField>
    <teleport to="footer">
      <div class="p-4 xl:p-8 bg-white flex flex-col xl:flex-row xl:justify-center">
        <MatchdButton
          type="button"
          variant="outline"
          :disabled="challengeLoading"
          class="mb-2 xl:mr-4 xl:mb-0"
          @click="$router.push({ name: 'Dashboard' })"
        >
          Abbrechen
        </MatchdButton>
        <MatchdButton
          type="button"
          variant="fill"
          :disabled="challengeLoading"
          :loading="challengeLoading"
          @click="onSubmit"
        >
          <template v-if="currentChallenge?.formStep && currentChallenge.formStep > 2">
            Speichern
          </template>
          <template v-else>Speichern und weiter</template>
        </MatchdButton>
      </div>
    </teleport>
  </form>
</template>

<script setup lang="ts">
import { challengeStep1FormMapper } from "@/api/mappers/challengeStep1FormMapper";
import type { Keyword } from "@/api/models/types";
import FormSaveError from "@/components/FormSaveError.vue";
import MatchdAutocomplete from "@/components/MatchdAutocomplete.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdField from "@/components/MatchdField.vue";
import MatchdSelect from "@/components/MatchdSelect.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { getDefaultTeamSizes } from "@/helpers/teamSize";
import type { ChallengeStep1Form } from "@/models/ChallengeStep1Form";
import { useStore } from "@/store";
import { ActionTypes as ChallengeActionTypes } from "@/store/modules/challenge/action-types";
import { ActionTypes as ContentActionsTypes } from "@/store/modules/content/action-types";
import { Field, useForm } from "vee-validate";
import { computed, onMounted, ref, watch } from "vue";

const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
}>();

const store = useStore();

const veeForm = useForm<ChallengeStep1Form>();
const onSubmit = veeForm.handleSubmit(async (formData) => {
  try {
    await store.dispatch(ChallengeActionTypes.SAVE_CHALLENGE_STEP1, {
      id: store.getters["currentChallenge"]?.id || null,
      title: formData.title,
      description: formData.description,
      challengeType: {
        id: formData.challengeTypeId,
      },
      compensation: formData.compensation,
      teamSize: formData.teamSize,
      keywords: formData.keywords.map((id) => ({
        id: id,
      })),
    });
    const challengeState = store.getters["challengeState"];
    emits("submitComplete", challengeState.success);
  } catch (e) {
    console.log(e); // todo
  }
});

const filteredKeywords = ref<Keyword[]>([]);
const keywordInput = ref("");

const isStudent = computed(() => store.getters["isStudent"]);
const currentChallenge = computed(() => store.getters["currentChallenge"]);
const challengeData = computed(() => challengeStep1FormMapper(currentChallenge.value));
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

const hasChallenges = computed(() => !!store.getters["challenges"].length);
const challengeTypes = computed(() => store.getters["challengeTypes"]);
const challengeLoading = computed(() => store.getters["challengeLoading"]);
const challengeState = computed(() => store.getters["challengeState"]);

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActionsTypes.KEYWORDS),
    store.dispatch(ContentActionsTypes.CHALLENGE_TYPES),
    store.dispatch(ContentActionsTypes.CHALLENGES),
  ]);

  veeForm.resetForm({
    values: challengeData.value,
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

const onChangeChallengeType = (challengeTypeId: string) => {
  veeForm.setFieldValue("challengeTypeId", challengeTypeId);
};

watch(
  () => veeForm.meta.value.dirty,
  () => {
    emits("changeDirty", veeForm.meta.value.dirty);
  }
);
</script>

<style></style>
