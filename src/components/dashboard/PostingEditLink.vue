<template>
  <router-link
    :to="{
      name: type === 'job' ? 'JobPostingCreate' : 'ProjectPostingCreate',
      params: { slug: posting.slug, step: 'schritt1' },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }} {{ isPublic ? "" : " (Entwurf)" }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </h3>
    <p v-if="!isJob" class="text-sm">
      {{ posting.projectType.name }} <br />
      {{ posting.topic.name }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting, ProjectPosting } from "api";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { JobPostingState, ProjectPostingState } from "@/api/models/types";

class Props {
  type = prop<"job" | "project">({ default: "job" });
  posting = prop<JobPosting | ProjectPosting>({ required: true });
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class PostingEditLink extends Vue.with(Props) {
  get isJob(): boolean {
    return this.type === "job";
  }

  get isPublic(): boolean {
    return (
      this.posting.state === JobPostingState.Public ||
      this.posting.state === ProjectPostingState.Public
    );
  }
}
</script>
