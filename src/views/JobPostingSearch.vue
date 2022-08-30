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
            mit Pensum
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
    <div>
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
      ></SearchResultGrid>
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
    </div>
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

<script lang="ts">
import { jobPostingMatchingInputMapper } from "@/api/mappers/jobPostingMatchingInputMapper";
import { AttachmentKey } from "@/api/models/types";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import SearchResultGrid from "@/components/SearchResultGrid.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { Routes } from "@/router";
import { ActionTypes } from "@/store/modules/content/action-types";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    SearchFilters,
    SearchResultBubbles,
    SearchResultGrid,
    SearchBoost,
  },
})
export default class JobPostingSearch extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Stellen suchen",
    })
  );
  techBoost = 3;
  softBoost = 3;
  zip = "";
  branchId = "";
  jobTypeId = "";
  workload = 100;
  layout = "bubbles";

  get matchesForBubbles() {
    return this.$store.getters["matchesForBubbles"];
  }

  get matchesForGrid() {
    return this.$store.getters["matchesForGrid"];
  }

  get user() {
    return this.$store.getters["user"];
  }

  get branches() {
    return this.$store.getters["branches"];
  }

  get jobTypes() {
    return this.$store.getters["jobTypes"];
  }

  get zipCity() {
    return this.$store.getters["zipCityJobs"];
  }

  get isStudent() {
    return this.$store.getters["isStudent"];
  }

  get avatar() {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatar,
      })?.[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatarFallback,
      })?.[0] ||
      undefined
    );
  }

  beforeMount() {
    this.layout = (this.$route.query?.layout as string) || "bubbles";
    this.jobTypeId =
      (this.$route.query?.jobTypeId as string) || this.user?.student?.jobType?.id || "";
    this.softBoost = this.$route.query?.softBoost
      ? parseInt(this.$route.query?.softBoost as string)
      : 3;
    this.techBoost = this.$route.query?.techBoost
      ? parseInt(this.$route.query?.techBoost as string)
      : 3;
    this.zip = (this.$route.query?.zip as string) || "";
    this.workload = parseInt(this.$route.query?.workload as string) || 100;
    this.branchId = (this.$route.query?.branchId as string) || this.user?.student?.branch?.id || "";

    this.persistFiltersToUrl();
  }

  async mounted() {
    await Promise.all([
      this.searchJobPostings(),
      this.loadZipCity(),
      this.$store.dispatch(ActionTypes.BRANCHES),
      this.$store.dispatch(ActionTypes.JOB_TYPE),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentAvatarFallback,
      }),
    ]);
    calculateMargins();
  }

  unmounted() {
    this.$store.commit(MutationTypes.RESET_MATCHES);
  }

  async searchJobPostings() {
    this.persistFiltersToUrl();
    await this.$store.dispatch(
      ActionTypes.MATCHING,
      jobPostingMatchingInputMapper({
        jobTypeId: this.jobTypeId,
        branchId: this.branchId,
        zip: this.zip,
        workload: this.workload,
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        first: 20,
        skip: 0,
      })
    );
  }

  async loadZipCity() {
    await this.$store.dispatch(ActionTypes.ZIP_CITY_JOBS, {
      ...(this.branchId && { branchId: this.branchId }),
    });
  }

  onClickResult(slug: string) {
    this.$router.push({ name: Routes.JOB_POSTING_DETAIL, params: { slug } });
  }

  onChangeLayout(layout: string) {
    this.layout = layout;
    this.persistFiltersToUrl();
  }

  onChangeJobType() {
    this.zip = "";
    Promise.all([this.loadZipCity(), this.searchJobPostings()]);
  }

  onChangeBranch() {
    this.zip = "";
    Promise.all([this.loadZipCity(), this.searchJobPostings()]);
  }

  onChangeZipCity() {
    this.searchJobPostings();
  }

  onChangeWorkload() {
    this.searchJobPostings();
  }

  onChangeSoftBoost(value: number) {
    this.softBoost = value;
    this.searchJobPostings();
  }

  onChangeTechBoost(value: number) {
    this.techBoost = value;
    this.searchJobPostings();
  }

  persistFiltersToUrl() {
    this.$router.replace({
      query: {
        layout: this.layout,
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        ...(this.branchId !== "" && { branchId: this.branchId }),
        ...(this.jobTypeId !== "" && { jobTypeId: this.jobTypeId }),
        ...(this.zip !== "" && { zip: this.zip }),
        workload: this.workload,
      },
    });
  }
}
</script>
