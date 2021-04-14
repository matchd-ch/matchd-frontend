<template>
  <div class="student-search-view">
    <SearchFilters class="search-filters fixed right-0 top-0 left-0 bg-company-gradient-t-b z-50">
      <form>
        Ich suche nach Talenten, welche für meine Stelle als
        <label for="jobPosting" class="sr-only">Stelle auswählen</label>
        <select
          id="jobPosting"
          name="jobPosting"
          class="bg-transparent border-b border-white py-2 appearance-none"
          @change="onChangeJobPosting"
          v-model="jobPostingId"
        >
          <option v-for="jobPosting in jobPostings" :key="jobPosting.id" :value="jobPosting.id">
            {{ jobPosting.title }}
          </option>
        </select>
        interessant sind
      </form>
      <div class="flex justify-center mt-4 xl:mt-0">
        <button type="button" @click="onChangeLayout('bubbles')" class="p-1">
          <span class="material-icons text-icon-lg">bubble_chart</span>
        </button>
        <button type="button" @click="onChangeLayout('grid')" class="p-1">
          <span class="material-icons text-icon-lg">view_comfy</span>
        </button>
      </div>
    </SearchFilters>
    <div class="mt-fixed-header mb-fixed-footer">
      <SearchResultBubbles
        v-if="
          layout === 'bubbles' &&
          matchesForBubbles.nodes.length > 0 &&
          matchesForBubbles.links.length > 0 &&
          avatar
        "
        :matches="matchesForBubbles"
        :avatar="avatar"
        rootType="jobposting"
        resultType="student"
        @clickResult="onClickResult"
      />
      <SearchResultGrid
        v-if="layout === 'grid' && matchesForGrid.length > 0"
        :matches="matchesForGrid"
        resultType="student"
        color="pink"
      ></SearchResultGrid>
    </div>
    <SearchBoost
      class="search-boost fixed right-0 bottom-0 left-0"
      @changeSoftBoost="onChangeSoftBoost"
      @changeTechBoost="onChangeTechBoost"
      :techBoost="techBoost"
      :softBoost="softBoost"
      color="pink"
    />
  </div>
</template>

<script lang="ts">
import { studentMatchingInputMapper } from "@/api/mappers/studentMatchingInputMapper";
import { AttachmentKey } from "@/api/models/types";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import SearchResultGrid from "@/components/SearchResultGrid.vue";
import { SearchResult } from "@/models/SearchResult";
import { SearchResultBubbleData } from "@/models/SearchResultBubbleData";
import { ActionTypes } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import type { Attachment, JobPosting } from "api";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    SearchResultBubbles,
    SearchResultGrid,
    SearchFilters,
    SearchBoost,
  },
})
export default class StudentSearch extends Vue {
  techBoost = 3;
  softBoost = 3;
  jobPostingId = "";
  layout = "bubbles";

  get jobPostings(): JobPosting[] {
    return this.$store.getters["jobPostings"];
  }

  get matchesForBubbles(): SearchResultBubbleData {
    return this.$store.getters["matchesForBubbles"];
  }

  get matchesForGrid(): SearchResult[] {
    return this.$store.getters["matchesForGrid"];
  }

  get isStudent(): boolean {
    return this.$store.getters["isStudent"];
  }

  get avatar(): Attachment | undefined {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatar,
      })[0] || undefined
    );
  }

  async mounted(): Promise<void> {
    window.addEventListener("resize", this.calculateMargins, true);
    this.calculateMargins();

    this.layout = (this.$route.query?.layout as string) || "bubbles";
    this.jobPostingId = (this.$route.query?.jobPostingId as string) || "";

    await this.$store.dispatch(ActionTypes.JOB_POSTINGS);
    if (this.jobPostings.length > 0 && this.jobPostingId === "") {
      this.jobPostingId = this.jobPostings[0].id;
    }

    this.persistFiltersToUrl();

    await Promise.all([
      this.searchStudents(),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatar,
      }),
    ]);
  }

  unmounted(): void {
    window.removeEventListener("resize", this.calculateMargins, true);
  }

  calculateMargins(): void {
    const root = document.documentElement;
    const filterHeight = (document.querySelector(".search-filters") as HTMLElement).offsetHeight;
    const boostHeight = (document.querySelector(".search-boost") as HTMLElement).offsetHeight;
    root.style.setProperty("--contentMarginTop", `${filterHeight}px`);
    root.style.setProperty("--contentMarginBottom", `${boostHeight}px`);
  }

  async searchStudents(): Promise<void> {
    this.persistFiltersToUrl();
    await this.$store.dispatch(
      ActionTypes.MATCHING,
      studentMatchingInputMapper({
        jobPostingId: this.jobPostingId,
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        first: 50,
        skip: 0,
      })
    );
  }

  onClickResult(slug: string): void {
    this.$router.push({ name: "StudentDetail", params: { slug } });
  }

  onChangeLayout(layout: string): void {
    this.layout = layout;
    this.persistFiltersToUrl();
  }

  onChangeJobPosting(): void {
    this.searchStudents();
  }

  onChangeSoftBoost(value: number): void {
    this.softBoost = value;
    this.searchStudents();
  }

  onChangeTechBoost(value: number): void {
    this.techBoost = value;
    this.searchStudents();
  }

  persistFiltersToUrl(): void {
    this.$router.replace({
      query: {
        layout: this.layout,
        ...(this.jobPostingId !== "" && { jobPostingId: this.jobPostingId }),
      },
    });
  }
}
</script>
