<template>
  <router-link
    :to="{
      name: routeName,
      params: params,
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
import { RouteParams } from "vue-router";

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
  get routeName(): string {
    if (this.type === "job") {
      return "JobPostingCreate";
    } else if (this.isPublic) {
      return "ProjectPostingDetail";
    } else {
      return "ProjectPostingCreate";
    }
  }

  get params(): RouteParams {
    return this.type === "job" || !this.isPublic
      ? { slug: this.posting.slug, step: "schritt1" }
      : { slug: this.posting.slug };
  }

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
