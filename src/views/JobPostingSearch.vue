<template>
  <div class="jobposting-search-view">
    <teleport to="header">
      <SearchFilters class="search-filters bg-student-gradient-t-b">
        <div class="grid grid-rows-4 grid-cols-1 xl:grid-rows-2-auto xl:grid-cols-2-auto gap-3">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            ein(e)
            <label for="jobType" class="sr-only">Art der Stelle</label>
            <select id="jobType" name="jobType" @change="onChangeJobType" v-model="jobTypeId">
              <option v-for="jobType in jobTypes" :key="jobType.id" :value="jobType.id">
                {{ jobType.name }}
                <template v-if="jobType.id === this.user?.student?.jobType?.id"
                  >(Profileinstellung)</template
                >
              </option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:items-center xl:justify-between">
            mit Pensum
            <label for="workload" class="sr-only">Stellenprozent</label>
            <select id="workload" name="workload" @change="onChangeWorkload" v-model="workload">
              <option v-for="(n, index) in 10" :value="n * 10" :key="index">{{ n * 10 }}%</option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:items-center xl:justify-between">
            im Bereich
            <label for="branch" class="sr-only">Bereich der Stelle</label>
            <select id="branch" name="branch" @change="onChangeBranch" v-model="branchId">
              <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
                <template v-if="branch.id === this.user?.student?.branch?.id"
                  >(Profileinstellung)</template
                >
              </option>
            </select>
          </div>
          <div class="flex flex-col xl:flex-row xl:items-center xl:items-center xl:justify-between">
            in
            <label for="zipCity" class="sr-only">Ort der Stelle</label>
            <select id="zipCity" name="zipCity" @change="onChangeZipCity" v-model="zip">
              <option value="">egal wo</option>
              <option v-for="city in zipCity" :key="city.zip" :value="city.zip">
                {{ city.zip }} {{ city.city }}
              </option>
            </select>
          </div>
        </div>
        <SearchBoost
          class="search-boost flex xl:hidden mt-4"
          @changeSoftBoost="onChangeSoftBoost"
          @changeTechBoost="onChangeTechBoost"
          :techBoost="techBoost"
          :softBoost="softBoost"
        />

        <template v-slot:display-toggles>
          <div class="hidden xl:flex justify-center mt-4 xl:mt-0">
            <button type="button" @click="onChangeLayout('bubbles')" class="p-1">
              <span class="material-icons text-icon-lg">bubble_chart</span>
            </button>
            <button type="button" @click="onChangeLayout('grid')" class="p-1">
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
        rootType="student"
        resultType="jobposting"
        @clickResult="onClickResult"
      />
      <SearchResultGrid
        v-if="layout === 'grid' && matchesForGrid.length > 0"
        :matches="matchesForGrid"
        resultType="jobposting"
        color="green"
      ></SearchResultGrid>
      <div class="min-h-content-with-fixed-bars flex justify-center items-center px-4" v-else>
        <div>👀 ganz schön leer hier. Derzeit gibt es leider keine Suchresultate zum Matchen.</div>
      </div>
    </div>
    <teleport to="footer">
      <SearchBoost
        class="search-boost hidden xl:flex"
        @changeSoftBoost="onChangeSoftBoost"
        @changeTechBoost="onChangeTechBoost"
        :techBoost="techBoost"
        :softBoost="softBoost"
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
import { SearchResult } from "@/models/SearchResult";
import { SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import { ActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment, Branch, JobType, User, ZipCity } from "api";
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

  get matchesForBubbles(): SearchResultBubbleData {
    return this.$store.getters["matchesForBubbles"];
  }

  get matchesForGrid(): SearchResult[] {
    return this.$store.getters["matchesForGrid"];
  }

  get user(): User | null {
    return this.$store.getters["user"];
  }

  get branches(): Branch[] {
    return this.$store.getters["branches"];
  }

  get jobTypes(): JobType[] {
    return this.$store.getters["jobTypes"];
  }

  get zipCity(): ZipCity[] {
    return this.$store.getters["zipCityJobs"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatar,
      })[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.StudentAvatarFallback,
      })[0] ||
      undefined
    );
  }

  beforeMount(): void {
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

  async mounted(): Promise<void> {
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

  async searchJobPostings(): Promise<void> {
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

  async loadZipCity(): Promise<void> {
    await this.$store.dispatch(ActionTypes.ZIP_CITY_JOBS, {
      ...(this.branchId && { branchId: this.branchId }),
    });
  }

  onClickResult(slug: string): void {
    this.$router.push({ name: "JobPostingDetail", params: { slug } });
  }

  onChangeLayout(layout: string): void {
    this.layout = layout;
    this.persistFiltersToUrl();
  }

  onChangeJobType(): void {
    this.zip = "";
    Promise.all([this.loadZipCity(), this.searchJobPostings()]);
  }

  onChangeBranch(): void {
    this.zip = "";
    Promise.all([this.loadZipCity(), this.searchJobPostings()]);
  }

  onChangeZipCity(): void {
    this.searchJobPostings();
  }

  onChangeWorkload(): void {
    this.searchJobPostings();
  }

  onChangeSoftBoost(value: number): void {
    this.softBoost = value;
    this.searchJobPostings();
  }

  onChangeTechBoost(value: number): void {
    this.techBoost = value;
    this.searchJobPostings();
  }

  persistFiltersToUrl(): void {
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
