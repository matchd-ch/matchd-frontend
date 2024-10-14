<template>
  <div class="jobposting-search-view">
    <teleport to="#teleporter-app-header">
      <SearchFilters class="search-filters bg-student-gradient-t-b">
        <div class="grid grid-rows-4 grid-cols-1 xl:grid-rows-2-auto xl:grid-cols-2-auto gap-3">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            ein(e)
            <label for="jobType" class="sr-only">Art der Stelle</label>
            <select id="jobType" v-model="jobTypeId" name="jobType" @change="onChangeJobType">
              <option v-for="jobType in jobTypes" :key="jobType.id" :value="jobType.id">
                {{ jobType.name }}
                <template v-if="jobType.id === user?.student?.jobType?.id">
                  (Profileinstellung)
                </template>
              </option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            mit Pensum bis
            <label for="workload" class="sr-only">Stellenprozent</label>
            <select id="workload" v-model="workload" name="workload" @change="onChangeWorkload">
              <option v-for="(n, index) in 10" :key="index" :value="n * 10">{{ n * 10 }}%</option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            im Bereich
            <label for="branch" class="sr-only">Bereich der Stelle</label>
            <select id="branch" v-model="branchId" name="branch" @change="onChangeBranch">
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
                <template v-if="branch.id === user?.student?.branch?.id"
                  >(Profileinstellung)</template
                >
              </option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            in
            <label for="zipCity" class="sr-only">Ort der Stelle</label>
            <select id="zipCity" v-model="zip" name="zipCity" @change="onChangeZipCity">
              <option value="">egal wo</option>
              <option v-for="city in zipCity" :key="city.zip" :value="city.zip">
                {{ city.zip }} {{ city.city }}
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
        root-type="student"
        result-type="jobposting"
        @click-result="onClickResult"
      />
      <SearchResultGrid
        v-else-if="layout === 'grid' && matchesForGrid.length > 0"
        :matches="matchesForGrid"
        result-type="jobposting"
        color="green"
      />
      <div
        v-else
        class="min-h-content-with-fixed-bars flex justify-center items-center px-4 text-xl"
      >
        <div>
          👀 ganz schön leer hier. Derzeit gibt es leider keine Suchresultate zum Matchen.<br />Welche
          Unternehmen dennoch zu dir passen, siehst du unter
          <router-link :to="{ name: 'CompanyList' }" class="text-primary-1 underline"
            >«Unternehmen entdecken»</router-link
          >.
        </div>
      </div>
    </LoadingBox>
    <teleport to="footer">
      <SearchBoost
        class="search-boost hidden xl:flex"
        :tech-boost="techBoost"
        :soft-boost="softBoost"
        @change-soft-boost="onChangeSoftBoost"
        @change-tech-boost="onChangeTechBoost"
      />
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { jobPostingMatchingInputMapper } from "@/api/mappers/jobPostingMatchingInputMapper";
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

useMeta({ title: "Stellen suchen" });
const store = useStore();
const router = useRouter();
const route = useRoute();
const techBoost = ref(3);
const softBoost = ref(3);
const zip = ref("");
const branchId = ref("");
const jobTypeId = ref("");
const workload = ref(100);
const { isMobile } = useDeviceDetector();
const layout = ref("bubbles");

const isLoading = computed(() => store.getters["matchesLoading"]);
const matchesForBubbles = computed(() => store.getters["matchesForBubbles"]);
const matchesForGrid = computed(() => store.getters["matchesForGrid"]);
const user = computed(() => store.getters["user"]);
const branches = computed(() => store.getters["branches"]);
const jobTypes = computed(() => store.getters["jobTypes"]);
const zipCity = computed(() => store.getters["zipCityJobs"]);
const avatar = computed(() => {
  return (
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.StudentAvatar,
    })?.[0] ||
    store.getters["attachmentsByKey"]({
      key: AttachmentKey.StudentAvatarFallback,
    })?.[0] ||
    undefined
  );
});

onBeforeMount(() => {
  jobTypeId.value = (route.query?.jobTypeId as string) || user.value?.student?.jobType?.id || "";
  softBoost.value = route.query?.softBoost ? parseInt(route.query?.softBoost as string) : 3;
  techBoost.value = route.query?.techBoost ? parseInt(route.query?.techBoost as string) : 3;
  zip.value = (route.query?.zip as string) || "";
  workload.value = parseInt(route.query?.workload as string) || 100;
  branchId.value = (route.query?.branchId as string) || user.value?.student?.branch?.id || "";

  persistFiltersToUrl();
});

function setLayout() {
  layout.value = isMobile.value ? "grid" : (route.query?.layout as string) || "bubbles";
}

watch(
  isMobile,
  () => {
    setLayout();
  },
  { immediate: true },
);

onMounted(async () => {
  await Promise.all([
    searchJobPostings(),
    loadZipCity(),
    store.dispatch(ActionTypes.BRANCHES),
    store.dispatch(ActionTypes.JOB_TYPE),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.StudentAvatar,
    }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.StudentAvatarFallback,
    }),
  ]);
  calculateMargins();
});

onUnmounted(() => {
  store.commit(MutationTypes.RESET_MATCHES);
});

async function searchJobPostings() {
  persistFiltersToUrl();
  await store.dispatch(
    ActionTypes.MATCHING,
    jobPostingMatchingInputMapper({
      jobTypeId: jobTypeId.value,
      branchId: branchId.value,
      zip: zip.value,
      workload: workload.value,
      softBoost: softBoost.value,
      techBoost: techBoost.value,
      first: 20,
      skip: 0,
    }),
  );
}

async function loadZipCity() {
  await store.dispatch(ActionTypes.ZIP_CITY_JOBS, {
    ...(branchId.value && { branchId: branchId.value }),
  });
}

function onClickResult(slug: string) {
  router.push({ name: Routes.JOB_POSTING_DETAIL, params: { slug } });
}

function onChangeLayout(value: string) {
  layout.value = value;
  persistFiltersToUrl();
}

function onChangeJobType() {
  zip.value = "";
  Promise.all([loadZipCity(), searchJobPostings()]);
}

function onChangeBranch() {
  zip.value = "";
  Promise.all([loadZipCity(), searchJobPostings()]);
}

function onChangeZipCity() {
  searchJobPostings();
}

function onChangeWorkload() {
  searchJobPostings();
}

function onChangeSoftBoost(value: number) {
  softBoost.value = value;
  searchJobPostings();
}

function onChangeTechBoost(value: number) {
  techBoost.value = value;
  searchJobPostings();
}

function persistFiltersToUrl() {
  router.replace({
    query: {
      layout: layout.value,
      softBoost: softBoost.value,
      techBoost: techBoost.value,
      ...(branchId.value !== "" && { branchId: branchId.value }),
      ...(jobTypeId.value !== "" && { jobTypeId: jobTypeId.value }),
      ...(zip.value !== "" && { zip: zip.value }),
      workload: workload.value,
    },
  });
}
</script>
<style lang="postcss" scoped>
.jobposting-search-view {
  min-height: inherit;
}
</style>
