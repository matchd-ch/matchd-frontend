<template>
  <div class="project-posting-search-view">
    <teleport to="#teleporter-app-header">
      <ProjectPostingSearchFilters
        v-slot="{ closePanel }"
        ref="projectPostingSearchFiltersRef"
        class="search-filters z-50"
        :class="{
          'bg-company-gradient-t-b': !isStudent,
          'bg-student-gradient-t-b': isStudent,
        }"
      >
        <div class="text-black grid grid-cols-12 xl:gap-x-16">
          <div class="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-6 xl:col-start-4">
            <MatchdField class="mt-10 mb-10">
              <template #label>Suchbegriff</template>
              <Field
                v-model="textSearch"
                name="searchQuery"
                as="input"
                placeholder="Projekttitel, Beschreibung, etc."
              />
            </MatchdField>

            <MatchdAutocomplete
              id="keywords"
              :class="{ 'mb-3': selectedKeywords.length, 'mb-10': !selectedKeywords.length }"
              :items="filteredKeywords"
              @select="handleSelectKeyword"
            >
              <template #label>Stichwörter</template>
              <input
                id="keywords"
                v-model="keywordsInput"
                type="text"
                autocomplete="off"
                placeholder="Tippen für Vorschläge"
                @input="handleInputKeyword"
                @keydown.enter.prevent="handlePressEnterKeyword"
              />
            </MatchdAutocomplete>
            <SelectPillGroup v-if="selectedKeywords.length" class="mb-10">
              <SelectPill
                v-for="option in selectedKeywords"
                :key="option.id"
                class="select-pill"
                :has-delete="true"
                @remove="handleRemoveKeyword(option)"
              >
                {{ option.name }}
              </SelectPill>
            </SelectPillGroup>

            <SelectPillGroup v-if="projectTypes.length" class="mb-10">
              <template #label>Projektart</template>
              <SelectPill
                v-for="option in projectTypes"
                :key="option.id"
                class="select-pill cursor-pointer"
                :has-input="false"
                :checked="!!selectedProjectTypes.find((pt) => pt.id === option.id)"
                :has-delete="!!selectedProjectTypes.find((pt) => pt.id === option.id)"
                @click.capture.prevent="handleSelectProjectType(option)"
              >
                {{ option.name }}
              </SelectPill>
            </SelectPillGroup>

            <SelectPillGroup class="mb-10">
              <template #label>Ausschreibung durch</template>
              <SelectPill
                v-for="option in Object.values(entities)"
                :key="option.name"
                class="select-pill cursor-pointer"
                :has-input="false"
                :checked="option.checked"
                :has-delete="option.checked"
                @click.capture.prevent="option.checked = !option.checked"
              >
                {{ option.name }}
              </SelectPill>
            </SelectPillGroup>
          </div>
          <hr class="col-span-12 block border-white mb-10 mx-[-1rem] xl:mx-[-2rem]" />
          <MatchdButton
            class="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-3 xl:col-start-4 mb-10"
            type="button"
            :loading="false"
            @click="
              fetchProjectPostings();
              closePanel();
            "
          >
            Suchen
          </MatchdButton>
          <MatchdButton
            class="col-span-12 md:col-span-10 md:col-start-2 xl:col-span-3 mb-10"
            type="button"
            variant="fill--white"
            @click="
              resetFilter();
              closePanel();
            "
          >
            Zurücksetzen
          </MatchdButton>
        </div>
      </ProjectPostingSearchFilters>
    </teleport>
    <div>
      <SearchResultProjectPostingGrid
        v-if="projectPostings.length"
        class="search-result-project-posting-grid"
        :project-postings="projectPostings"
        result-type="student"
        :color="isStudent ? 'green' : 'pink'"
      />
      <div
        v-else
        class="min-h-content-with-fixed-bars flex justify-center items-center px-4 text-xl"
      >
        <div v-if="isStudent">
          Leider haben wir kein passendes Projekt gefunden, hab' etwas Geduld.
        </div>
        <div v-else>Leider haben wir kein passendes Projekt gefunden, haben Sie etwas Geduld.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import { KeywordsKeywordFragment } from "@/api/queries/keywordsFragment.generated";
import { ProjectTypesProjectTypeFragment } from "@/api/queries/projectTypesFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import ProjectPostingSearchFilters from "@/components/ProjectPostingSearchFilters.vue";
import SearchResultProjectPostingGrid from "@/components/SearchResultProjectPostingGrid.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { Field } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { useMeta } from "vue-meta";
import { useRouter } from "vue-router";
import MatchdAutocomplete from "../components/MatchdAutocomplete.vue";
import MatchdField from "../components/MatchdField.vue";

const meta = useMeta({
  title: "Projekte suchen",
});
const store = useStore();
const router = useRouter();
const projectPostingSearchFiltersRef = ref<typeof ProjectPostingSearchFilters | null>(null);
const filteredKeywords = ref<KeywordsKeywordFragment[]>([]);
const keywords = computed(() => store.getters["keywords"]);
const keywordsInput = ref("");
const selectedKeywords = ref<KeywordsKeywordFragment[]>([]);
const projectTypes = computed(() => store.getters["projectTypes"]);
const selectedProjectTypes = ref<ProjectTypesProjectTypeFragment[]>([]);
const textSearch = ref("");
const projectPostingId = ref("");
enum Entities {
  TALENT = "TALENT",
  COMPANY = "COMPANY",
  UNIVERSITY = "UNIVERSITY",
}

const entities = ref<{ [key in Entities]: { name: string; checked: boolean } }>({
  [Entities.TALENT]: {
    name: "Talent",
    checked: false,
  },
  [Entities.COMPANY]: {
    name: "Unternehmen",
    checked: false,
  },
  [Entities.UNIVERSITY]: {
    name: "Bildungseinrichtung",
    checked: false,
  },
});

const projectPostings = computed(() => store.getters["projectPostings"]);
const isStudent = computed(() => store.getters["isStudent"]);

const avatar = computed(() => {
  return (
    store.getters["attachmentsByKey"]({
      key: isStudent.value ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
    })?.[0] ||
    store.getters["attachmentsByKey"]({
      key: isStudent.value
        ? AttachmentKey.StudentAvatarFallback
        : AttachmentKey.CompanyAvatarFallback,
    })?.[0] ||
    undefined
  );
});

const persistFiltersToUrl = () => {
  router.replace({
    query: {
      projectPostingId: projectPostingId.value,
    },
  });
};

const availableKeywords = computed(() => {
  return keywords.value.filter((keyword) => {
    return keywords.value.some((kw) => kw.id === keyword.id);
  });
});

const handleInputKeyword = () => {
  if (!keywordsInput.value.length) {
    filteredKeywords.value = [];
    return;
  }
  filteredKeywords.value = availableKeywords.value.filter((item) =>
    item.name.toLowerCase().startsWith(keywordsInput.value.toLowerCase())
  );
};

const handleSelectKeyword = (keyword: KeywordsKeywordFragment) => {
  keywordsInput.value = "";
  if (selectedKeywords.value.find((kw) => kw.id === keyword.id)) {
    return;
  }
  selectedKeywords.value = [...selectedKeywords.value, keyword];
  handleInputKeyword();
};

const handlePressEnterKeyword = () => {
  if (filteredKeywords.value.length === 1) {
    handleSelectKeyword(filteredKeywords.value[0]);
  }
};

const handleRemoveKeyword = (keyword: KeywordsKeywordFragment) => {
  selectedKeywords.value = selectedKeywords.value.filter((kw) => kw.id !== keyword.id);
};

const handleSelectProjectType = (projectType: ProjectTypesProjectTypeFragment) => {
  if (selectedProjectTypes.value.find((pt) => pt.id === projectType.id)) {
    selectedProjectTypes.value = selectedProjectTypes.value.filter(
      (kw) => kw.id !== projectType.id
    );
    return;
  }
  selectedProjectTypes.value = [...selectedProjectTypes.value, projectType];
};

const fetchProjectPostings = async () => {
  await store.dispatch(ActionTypes.PROJECT_POSTINGS, {
    ...(textSearch.value && { textSearch: textSearch.value }),
    ...(entities.value.TALENT.checked && { filterTalentProjects: true }),
    ...(entities.value.COMPANY.checked && { filterCompanyProjects: true }),
    ...(entities.value.UNIVERSITY.checked && { filterUniversityProjects: true }),
    ...(selectedProjectTypes.value.length && {
      projectTypeIds: selectedProjectTypes.value.map((pt) => pt.id),
    }),
    ...(selectedKeywords.value.length && { keywordIds: selectedKeywords.value.map((kw) => kw.id) }),
  });
  if (projectPostings.value.length > 0 && projectPostingId.value === "") {
    projectPostingId.value = projectPostings.value[0].id;
  }
};

const resetFilter = () => {
  textSearch.value = "";
  selectedKeywords.value = [];
  selectedProjectTypes.value = [];
  Object.values(entities.value).forEach((cat) => (cat.checked = false));
  fetchProjectPostings();
};
// onBeforeUnmount(() => {
//   projectPostingId.value = (route.query?.projectPostingId as string) || "";
//   persistFiltersToUrl();
// });

onMounted(async () => {
  // await store.dispatch(ActionTypes.PROJECT_POSTINGS);
  // if (projectPostings.value.length > 0 && projectPostingId.value === "") {
  //   projectPostingId.value = projectPostings.value[0].id;
  // }

  await Promise.all([
    store.dispatch(ActionTypes.KEYWORDS),
    store.dispatch(ActionTypes.PROJECT_TYPES),
    fetchProjectPostings(),
  ]);
  calculateMargins();
});
</script>

<style lang="postcss" scoped>
@block search-filters {
  --color-primary-1: var(--color-white);
}
@block select-pill {
  --color-primary-1: var(--color-black);
}
</style>
