<template>
  <SearchFilters class="bg-company-gradient-t-b">
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
          {{ jobPosting.description }}
        </option>
      </select>
      interessant sind
    </form>
    <div>
      <button type="button" @click="onChangeLayout('bubbles')" class="p-1">
        <span class="material-icons text-icon-lg">bubble_chart</span>
      </button>
      <button type="button" @click="onChangeLayout('grid')" class="p-1">
        <span class="material-icons text-icon-lg">view_comfy</span>
      </button>
    </div>
  </SearchFilters>
  <div style="margin-top: 114.5px; margin-bottom: 88px">
    <SearchResultBubbles
      v-if="
        layout === 'bubbles' &&
        matchesForBubbles.nodes.length > 0 &&
        matchesForBubbles.links.length > 0 &&
        avatar
      "
      :matches="matchesForBubbles"
      :avatar="avatar"
      resultType="student"
    />
    <SearchResultGrid
      v-if="layout === 'grid' && matchesForGrid.length > 0"
      :matches="matchesForGrid"
    ></SearchResultGrid>
  </div>
  <SearchBoost
    @changeSoftBoost="onChangeSoftBoost"
    @changeTechBoost="onChangeTechBoost"
    :techBoost="techBoost"
    :softBoost="softBoost"
    color="pink"
  />
</template>

<script lang="ts">
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
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate", "beforeRouteEnter"]);

@Options({
  components: {
    SearchResultBubbles,
    SearchResultGrid,
    SearchFilters,
    SearchBoost,
  },
})
export default class SearchStudent extends Vue {
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
        key: this.isStudent ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
      })[0] || undefined
    );
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    this.layout = (to.query?.layout as string) || "bubbles";
    this.jobPostingId = (to.query?.jobPostingId as string) || "";
    next();
  }

  async mounted(): Promise<void> {
    this.layout = (this.$route.query?.layout as string) || "bubbles";
    this.jobPostingId = (this.$route.query?.jobPostingId as string) || "";

    await this.$store.dispatch(ActionTypes.JOB_POSTINGS);
    if (this.jobPostings.length > 0 && this.jobPostingId === "") {
      this.jobPostingId = this.jobPostings[0].id;
    }

    await Promise.all([
      this.searchTalents(),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.StudentAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatar,
      }),
    ]);
  }

  async searchTalents(): Promise<void> {
    await this.$store.dispatch(ActionTypes.MATCHES, {
      jobPostingId: this.jobPostingId,
      softBoost: this.softBoost,
      techBoost: this.techBoost,
      first: 50,
      skip: 0,
    });
  }

  onChangeLayout(layout: string) {
    this.$router.push({ query: { ...this.$route.query, layout } });
  }

  onChangeJobPosting(): void {
    this.$router.push({ query: { ...this.$route.query, jobPostingId: this.jobPostingId } });
    this.searchTalents();
  }

  onChangeSoftBoost(value: number): void {
    this.softBoost = value;
    this.searchTalents();
  }

  onChangeTechBoost(value: number): void {
    this.techBoost = value;
    this.searchTalents();
  }
}
</script>
