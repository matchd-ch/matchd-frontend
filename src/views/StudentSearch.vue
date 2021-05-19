<template>
  <div class="student-search-view">
    <teleport to="header">
      <SearchFilters class="search-filters bg-company-gradient-t-b z-50">
        <form>
          Ich suche nach Talenten, die für meine Stelle als
          <label for="jobPosting" class="sr-only">Stelle auswählen</label>
          <select
            id="jobPosting"
            name="jobPosting"
            class="bg-transparent border-b border-white py-2 px-1 appearance-none"
            @change="onChangeJobPosting"
            v-model="jobPostingId"
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
        :jobPostingId="jobPostingId"
        rootType="jobposting"
        resultType="student"
        @clickResult="onClickResult"
      />
      <SearchResultGrid
        v-if="layout === 'grid' && matchesForGrid.length > 0"
        :matches="matchesForGrid"
        :jobPostingId="jobPostingId"
        resultType="student"
        color="pink"
      ></SearchResultGrid>
    </div>
    <teleport to="footer">
      <SearchBoost
        class="search-boost"
        @changeSoftBoost="onChangeSoftBoost"
        @changeTechBoost="onChangeTechBoost"
        :techBoost="techBoost"
        :softBoost="softBoost"
        color="pink"
      />
    </teleport>
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
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    SearchResultBubbles,
    SearchResultGrid,
    SearchFilters,
    SearchBoost,
  },
})
export default class StudentSearch extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Talente suchen",
    })
  );
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
      })[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatarFallback,
      })[0] ||
      undefined
    );
  }

  async mounted(): Promise<void> {
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
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatarFallback,
      }),
    ]);
  }

  async searchStudents(): Promise<void> {
    this.persistFiltersToUrl();
    await this.$store.dispatch(
      ActionTypes.MATCHING,
      studentMatchingInputMapper({
        jobPostingId: this.jobPostingId,
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        first: 20,
        skip: 0,
      })
    );
  }

  onClickResult(slug: string): void {
    this.$router.push({
      name: "StudentDetail",
      params: { slug },
      query: { jobPostingId: this.jobPostingId },
    });
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
