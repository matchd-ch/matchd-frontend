<template>
  <div class="student-search-view">
    <teleport to="#teleporter-app-header">
      <SearchFilters class="search-filters bg-company-gradient-t-b z-50">
        <div class="grid grid-rows-1 grid-cols-1 gap-3">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            nach Talenten für meine Stelle als
            <label for="jobPosting" class="sr-only">Stelle auswählen</label>
            <select
              id="jobPosting"
              v-model="jobPostingId"
              name="jobPosting"
              class="bg-transparent border-b border-white py-2 px-1 appearance-none grow xl:ml-4"
              @change="onChangeJobPosting"
            >
              <option
                v-for="jobPosting in jobPostings"
                :key="jobPosting.id"
                :value="jobPosting.id"
                class="text-pink-1"
              >
                {{ jobPosting.title }}
              </option>
            </select>
          </div>
        </div>
        <SearchBoost
          class="search-boost flex xl:hidden mt-4"
          :tech-boost="techBoost"
          :soft-boost="softBoost"
          @change-soft-boost="onChangeSoftBoost"
          @change-tech-boost="onChangeTechBoost"
        />

        <template #display-toggles>
          <div class="hidden xl:flex justify-center mt-4 xl:mt-0">
            <button type="button" class="p-1" @click="onChangeLayout('bubbles')">
              <span class="material-icons text-icon-lg">bubble_chart</span>
            </button>
            <button type="button" class="p-1" @click="onChangeLayout('grid')">
              <span class="material-icons text-icon-lg">view_comfy</span>
            </button>
          </div>
        </template>
      </SearchFilters>
    </teleport>
    <LoadingBox :is-loading="isLoading">
      <SearchResultBubbles
        v-if="
          layout === 'bubbles' &&
          matchesForBubbles.nodes.length > 0 &&
          matchesForBubbles.links.length > 0 &&
          avatar
        "
        :matches="matchesForBubbles"
        :avatar="avatar"
        :job-posting-id="jobPostingId"
        root-type="jobposting"
        result-type="student"
        @click-result="onClickResult"
      />
      <SearchResultGrid
        v-else-if="layout === 'grid' && matchesForGrid.length > 0"
        :matches="matchesForGrid"
        :job-posting-id="jobPostingId"
        result-type="student"
        color="pink"
      />
      <div
        v-else
        class="min-h-content-with-fixed-bars flex justify-center items-center px-4 text-xl"
      >
        <div>Leider haben wir kein passendes Talent gefunden, haben Sie etwas Geduld.</div>
      </div>
    </LoadingBox>
    <teleport to="footer">
      <SearchBoost
        class="search-boost hidden xl:flex"
        :tech-boost="techBoost"
        :soft-boost="softBoost"
        color="pink"
        @change-soft-boost="onChangeSoftBoost"
        @change-tech-boost="onChangeTechBoost"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { studentMatchingInputMapper } from "@/api/mappers/studentMatchingInputMapper";
import { AttachmentKey } from "@/api/models/types";
import LoadingBox from "@/components/LoadingBox.vue";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import SearchResultGrid from "@/components/SearchResultGrid.vue";
import useDeviceDetector from "@/composables/useDeviceDetector";
import { calculateMargins } from "@/helpers/calculateMargins";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/content/action-types";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { computed, onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import { useMeta } from "vue-meta";
import { useRoute, useRouter } from "vue-router";

useMeta({
  title: "Talente suchen",
});

const store = useStore();
const router = useRouter();
const route = useRoute();
const techBoost = ref(3);
const softBoost = ref(3);
const jobPostingId = ref("");
const { isMobile } = useDeviceDetector();
const layout = ref("bubbles");

const jobPostings = computed(() => store.getters["jobPostings"]);
const isLoading = computed(() => store.getters["matchesLoading"]);
const matchesForBubbles = computed(() => store.getters["matchesForBubbles"]);
const matchesForGrid = computed(() => store.getters["matchesForGrid"]);

const avatar = computed(() => {
  return (
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.CompanyAvatar,
    })?.[0] ??
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.CompanyAvatarFallback,
    })?.[0] ??
    undefined
  );
});

async function searchStudents() {
  persistFiltersToUrl();
  await store.dispatch(
    ActionTypes.MATCHING,
    studentMatchingInputMapper({
      jobPostingId: jobPostingId.value,
      softBoost: softBoost.value,
      techBoost: techBoost.value,
      first: 20,
      skip: 0,
    }),
  );
}

function onClickResult(slug: string) {
  router.push({
    name: Routes.STUDENT_DETAIL,
    params: { slug },
    query: { jobPostingId: jobPostingId.value },
  });
}

function onChangeLayout(value: string) {
  layout.value = value;
  persistFiltersToUrl();
}

function onChangeJobPosting() {
  searchStudents();
}

function onChangeSoftBoost(value: number) {
  softBoost.value = value;
  searchStudents();
}

function onChangeTechBoost(value: number) {
  techBoost.value = value;
  searchStudents();
}

function persistFiltersToUrl() {
  router.replace({
    query: {
      layout: layout.value,
      softBoost: softBoost.value,
      techBoost: techBoost.value,
      ...(jobPostingId.value !== "" && { jobPostingId: jobPostingId.value }),
    },
  });
}

function setLayout() {
  layout.value = isMobile.value ? "grid" : (route.query?.layout as string) || "bubbles";
}

onBeforeMount(() => {
  softBoost.value = route.query?.softBoost ? parseInt(route.query?.softBoost as string) : 3;
  techBoost.value = route.query?.techBoost ? parseInt(route.query?.techBoost as string) : 3;
  jobPostingId.value = (route.query?.jobPostingId as string) || "";
  persistFiltersToUrl();
});

watch(
  isMobile,
  () => {
    setLayout();
  },
  { immediate: true },
);

onMounted(async () => {
  await store.dispatch(ActionTypes.JOB_POSTINGS);
  if (jobPostings.value.length > 0 && jobPostingId.value === "") {
    jobPostingId.value = jobPostings.value[0].id;
  }

  await Promise.all([
    searchStudents(),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyAvatar,
    }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyAvatarFallback,
    }),
  ]);
  calculateMargins();
});

onUnmounted(() => {
  store.commit(MutationTypes.RESET_MATCHES);
});
</script>
<style lang="postcss" scoped>
.student-search-view {
  min-height: inherit;
}
</style>
