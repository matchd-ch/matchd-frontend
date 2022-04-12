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
      ></SearchResultGrid>
      <div
        v-else
        class="min-h-content-with-fixed-bars flex justify-center items-center px-4 text-xl"
      >
        <div>Leider haben wir kein passendes Talent gefunden, haben Sie etwas Geduld.</div>
      </div>
    </div>
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

<script lang="ts">
import { studentMatchingInputMapper } from "@/api/mappers/studentMatchingInputMapper";
import { AttachmentKey } from "@/api/models/types";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import SearchResultGrid from "@/components/SearchResultGrid.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ActionTypes } from "@/store/modules/content/action-types";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
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

  get jobPostings() {
    return this.$store.getters["jobPostings"];
  }

  get matchesForBubbles() {
    console.log(this.$store.getters["matchesForBubbles"]);
    return this.$store.getters["matchesForBubbles"];
  }

  get matchesForGrid() {
    return this.$store.getters["matchesForGrid"];
  }

  get isStudent() {
    return this.$store.getters["isStudent"];
  }

  get avatar() {
    return (
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatar,
      })?.[0] ??
      this.$store.getters["attachmentsByKey"]({
        key: AttachmentKey.CompanyAvatarFallback,
      })?.[0] ??
      undefined
    );
  }

  beforeMount() {
    this.layout = (this.$route.query?.layout as string) || "bubbles";
    this.softBoost = this.$route.query?.softBoost
      ? parseInt(this.$route.query?.softBoost as string)
      : 3;
    this.techBoost = this.$route.query?.techBoost
      ? parseInt(this.$route.query?.techBoost as string)
      : 3;
    this.jobPostingId = (this.$route.query?.jobPostingId as string) || "";
    this.persistFiltersToUrl();
  }

  async mounted() {
    await this.$store.dispatch(ActionTypes.JOB_POSTINGS);
    if (this.jobPostings.length > 0 && this.jobPostingId === "") {
      this.jobPostingId = this.jobPostings[0].id;
    }

    await Promise.all([
      this.searchStudents(),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: AttachmentKey.CompanyAvatarFallback,
      }),
    ]);
    calculateMargins();
  }

  unmounted() {
    this.$store.commit(MutationTypes.RESET_MATCHES);
  }

  async searchStudents() {
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

  onClickResult(slug: string) {
    this.$router.push({
      name: "StudentDetail",
      params: { slug },
      query: { jobPostingId: this.jobPostingId },
    });
  }

  onChangeLayout(layout: string) {
    this.layout = layout;
    this.persistFiltersToUrl();
  }

  onChangeJobPosting() {
    this.searchStudents();
  }

  onChangeSoftBoost(value: number) {
    this.softBoost = value;
    this.searchStudents();
  }

  onChangeTechBoost(value: number) {
    this.techBoost = value;
    this.searchStudents();
  }

  persistFiltersToUrl() {
    this.$router.replace({
      query: {
        layout: this.layout,
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        ...(this.jobPostingId !== "" && { jobPostingId: this.jobPostingId }),
      },
    });
  }
}
</script>
