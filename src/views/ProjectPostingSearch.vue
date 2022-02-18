<template>
  <div class="project-posting-search-view">
    <teleport to="#teleporter-app-header">
      <SearchFilters
        class="search-filters z-50"
        :class="{ 'bg-company-gradient-t-b': !isStudent, 'bg-student-gradient-t-b': isStudent }"
      >
        <div class="grid grid-rows-1 grid-cols-1 gap-3">
          <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            nach Matches für mein Projekt
            <label for="projectPosting" class="sr-only">Projekt auswählen</label>
            <select
              id="projectPosting"
              v-model="projectPostingId"
              name="projectPosting"
              class="bg-transparent border-b border-white py-2 px-1 appearance-none grow xl:ml-4"
              @change="onChangeFilter"
            >
              <option
                v-for="projectPosting in projectPostings"
                :key="projectPosting.id"
                :value="projectPosting.id"
                class="text-primary-1"
              >
                {{ projectPosting.title }}
              </option>
            </select>
          </div>
        </div>
        <SearchBoost
          class="search-boost flex xl:hidden mt-4"
          tech-boost-label="Stichworte"
          :tech-boost="techBoost"
          :soft-boost="softBoost"
          @change-soft-boost="onChangeSoftBoost"
          @change-tech-boost="onChangeTechBoost"
        />
      </SearchFilters>
    </teleport>
    <div>
      <SearchResultProjectPostingGrid
        v-if="matchesForGrid.length > 0"
        :matches="matchesForGrid"
        result-type="student"
        :color="isStudent ? 'green' : 'pink'"
      ></SearchResultProjectPostingGrid>
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
    <teleport to="footer">
      <SearchBoost
        class="search-boost hidden xl:flex"
        tech-boost-label="Stichworte"
        :tech-boost="techBoost"
        :soft-boost="softBoost"
        @change-soft-boost="onChangeSoftBoost"
        @change-tech-boost="onChangeTechBoost"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { projectPostingMatchingInputMapper } from "@/api/mappers/projectMatchingInputMapper";
import { AttachmentKey } from "@/api/models/types";
import SearchBoost from "@/components/SearchBoost.vue";
import SearchFilters from "@/components/SearchFilters.vue";
import SearchResultBubbles from "@/components/SearchResultBubbles.vue";
import SearchResultGrid from "@/components/SearchResultGrid.vue";
import SearchResultProjectPostingGrid from "@/components/SearchResultProjectPostingGrid.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { ActionTypes } from "@/store/modules/content/action-types";
import { MutationTypes } from "@/store/modules/content/mutation-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { Options, setup, Vue } from "vue-class-component";
import { useMeta } from "vue-meta";

@Options({
  components: {
    SearchResultProjectPostingGrid,
    SearchResultBubbles,
    SearchResultGrid,
    SearchFilters,
    SearchBoost,
  },
})
export default class ProjectPostingSearch extends Vue {
  meta = setup(() =>
    useMeta({
      title: "Projekte suchen",
    })
  );
  techBoost = 3;
  softBoost = 3;
  projectPostingId = "";

  get projectPostings() {
    return this.$store.getters["projectPostings"];
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
        key: this.isStudent ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
      })?.[0] ||
      this.$store.getters["attachmentsByKey"]({
        key: this.isStudent
          ? AttachmentKey.StudentAvatarFallback
          : AttachmentKey.CompanyAvatarFallback,
      })?.[0] ||
      undefined
    );
  }

  beforeMount() {
    this.softBoost = this.$route.query?.softBoost
      ? parseInt(this.$route.query?.softBoost as string)
      : 3;
    this.techBoost = this.$route.query?.techBoost
      ? parseInt(this.$route.query?.techBoost as string)
      : 3;
    this.projectPostingId = (this.$route.query?.projectPostingId as string) || "";
    this.persistFiltersToUrl();
  }

  async mounted() {
    await this.$store.dispatch(ActionTypes.PROJECT_POSTINGS);
    if (this.projectPostings.length > 0 && this.projectPostingId === "") {
      this.projectPostingId = this.projectPostings[0].id;
    }

    await Promise.all([
      this.searchProjects(),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: this.isStudent ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
      }),
      this.$store.dispatch(UploadActionTypes.UPLOADED_FILES, {
        key: this.isStudent
          ? AttachmentKey.StudentAvatarFallback
          : AttachmentKey.CompanyAvatarFallback,
      }),
    ]);
    calculateMargins();
  }

  async searchProjects() {
    this.persistFiltersToUrl();
    await this.$store.dispatch(
      ActionTypes.MATCHING,
      projectPostingMatchingInputMapper({
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        projectPostingId: this.projectPostingId,
        first: 20,
        skip: 0,
      })
    );
  }

  unmounted() {
    this.$store.commit(MutationTypes.RESET_MATCHES);
  }

  onChangeFilter() {
    this.searchProjects();
  }

  onChangeSoftBoost(value: number) {
    this.softBoost = value;
    this.searchProjects();
  }

  onChangeTechBoost(value: number) {
    this.techBoost = value;
    this.searchProjects();
  }

  persistFiltersToUrl() {
    this.$router.replace({
      query: {
        softBoost: this.softBoost,
        techBoost: this.techBoost,
        projectPostingId: this.projectPostingId,
      },
    });
  }
}
</script>
