<template>
  <div class="challenge-search-view">
    <teleport to="#teleporter-app-header">
      <ChallengeSearchFilters
        v-slot="{ closePanel }"
        ref="challengeSearchFiltersRef"
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
                placeholder="Challengetitel, Beschreibung, etc."
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

            <SelectPillGroup v-if="challengeTypes.length" class="mb-10">
              <template #label>Art</template>
              <SelectPill
                v-for="option in challengeTypes"
                :key="option.id"
                class="select-pill cursor-pointer"
                :has-input="false"
                :checked="!!selectedChallengeTypes.find((pt) => pt.id === option.id)"
                :has-delete="!!selectedChallengeTypes.find((pt) => pt.id === option.id)"
                @click.capture.prevent="handleSelectChallengeType(option)"
              >
                {{ option.name }}
              </SelectPill>
            </SelectPillGroup>

            <SelectPillGroup v-if="!isLoggedIn" class="mb-10">
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
              fetchChallenges();
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
      </ChallengeSearchFilters>
    </teleport>

    <div
      v-if="
        companyOrUniversityProgress && companyOrUniversityProgress.sections.setupTalentSearch < 1
      "
      class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5"
    >
      <div
        class="col-start-1 lg:col-start-6 col-span-full lg:col-span-6 px-4 lg:px-5 py-12 text-center"
      >
        <h2 class="flex-1 mt-8 mb-4 text-display-xs">
          Ihr Profil ist zu {{ formatProgress(companyOrUniversityProgress.global) }} vollständig.
        </h2>
        <p class="mb-8">
          Damit Talents Sie besser finden und sich mit Ihnen verbinden können, sollten Sie zuerst
          Ihr Profil vervollständigen.
        </p>
        <MatchdButton tag="router-link" :to="{ name: 'ProfileEdit', params: { step: 'schritt1' } }">
          Profil vervollständigen
        </MatchdButton>
      </div>
    </div>
    <LoadingBox v-else :is-loading="isLoading">
      <SearchResultChallengeGrid
        v-if="challenges.length > 0"
        class="search-result-challenge-grid"
        :challenges="challenges"
        result-type="student"
        :color="isStudent ? 'green' : 'pink'"
      />
      <div
        v-else
        class="min-h-content-with-fixed-bars flex justify-center items-center px-4 text-xl"
      >
        <div v-if="isStudent">
          Leider haben wir kein passendes Challenge gefunden, hab' etwas Geduld.
        </div>
        <div v-else>
          Leider haben wir kein passendes Challenge gefunden, haben Sie etwas Geduld.
        </div>
      </div>
    </LoadingBox>
  </div>
</template>

<script setup lang="ts">
import type { ChallengeTypesChallengeTypeFragment } from "@/api/queries/challengeTypesFragment.generated";
import type { KeywordsKeywordFragment } from "@/api/queries/keywordsFragment.generated";
import ChallengeSearchFilters from "@/components/ChallengeSearchFilters.vue";
import LoadingBox from "@/components/LoadingBox.vue";
import MatchdButton from "@/components/MatchdButton.vue";
import SearchResultChallengeGrid from "@/components/SearchResultChallengeGrid.vue";
import SelectPill from "@/components/SelectPill.vue";
import SelectPillGroup from "@/components/SelectPillGroup.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import useProgressIndicator from "@/helpers/useProgressIndicator";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { Field } from "vee-validate";
import { computed, onMounted, ref } from "vue";
import { useMeta } from "vue-meta";
import MatchdAutocomplete from "../components/MatchdAutocomplete.vue";
import MatchdField from "../components/MatchdField.vue";

useMeta({
  title: "Challenges suchen",
});
const store = useStore();
const challengeSearchFiltersRef = ref<typeof ChallengeSearchFilters | null>(null);
const filteredKeywords = ref<KeywordsKeywordFragment[]>([]);
const keywords = computed(() => store.getters["keywords"]);
const keywordsInput = ref("");
const selectedKeywords = ref<KeywordsKeywordFragment[]>([]);
const challengeTypes = computed(() => store.getters["challengeTypes"]);
const selectedChallengeTypes = ref<ChallengeTypesChallengeTypeFragment[]>([]);
const isLoggedIn = computed(() => store.getters["isLoggedIn"]);
const textSearch = ref("");
const challengeId = ref("");
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

const { companyProgress, universityProgress, formatProgress } = useProgressIndicator();
const challenges = computed(() => store.getters["challenges"]);
const isLoading = computed(() => store.getters["challengesLoading"]);
const isStudent = computed(() => store.getters["isStudent"]);
const isCompany = computed(() => store.getters["isCompany"]);
const isUniversity = computed(() => store.getters["isUniversity"]);

const companyOrUniversityProgress = computed(() =>
  isCompany.value ? companyProgress.value : isUniversity.value ? universityProgress.value : null
);

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

const handleSelectChallengeType = (challengeType: ChallengeTypesChallengeTypeFragment) => {
  if (selectedChallengeTypes.value.find((pt) => pt.id === challengeType.id)) {
    selectedChallengeTypes.value = selectedChallengeTypes.value.filter(
      (kw) => kw.id !== challengeType.id
    );
    return;
  }
  selectedChallengeTypes.value = [...selectedChallengeTypes.value, challengeType];
};

const fetchChallenges = async () => {
  await store.dispatch(ActionTypes.CHALLENGES, {
    ...(textSearch.value && { textSearch: textSearch.value }),
    ...(entities.value.TALENT.checked && { filterTalentChallenges: true }),
    ...(entities.value.COMPANY.checked && { filterCompanyChallenges: true }),
    ...(entities.value.UNIVERSITY.checked && { filterUniversityChallenges: true }),
    ...(selectedChallengeTypes.value.length && {
      challengeTypeIds: selectedChallengeTypes.value.map((pt) => pt.id),
    }),
    ...(selectedKeywords.value.length && { keywordIds: selectedKeywords.value.map((kw) => kw.id) }),
  });
  if (challenges.value.length > 0 && challengeId.value === "") {
    challengeId.value = challenges.value[0].id;
  }
};

const resetFilter = () => {
  textSearch.value = "";
  selectedKeywords.value = [];
  selectedChallengeTypes.value = [];
  Object.values(entities.value).forEach((cat) => (cat.checked = false));
  fetchChallenges();
};

onMounted(async () => {
  await Promise.all([
    store.dispatch(ActionTypes.KEYWORDS),
    store.dispatch(ActionTypes.CHALLENGE_TYPES),
    fetchChallenges(),
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
.challenge-search-view {
  min-height: inherit;
}
</style>
