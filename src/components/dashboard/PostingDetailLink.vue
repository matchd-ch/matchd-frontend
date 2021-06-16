<template>
  <router-link
    :to="{
      name: isJob ? 'JobPostingDetail' : 'ProjectPostingDetail',
      params: { slug: posting.slug },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </h3>
    <p v-if="!isJob" class="text-sm">
      {{ posting.projectType.name }}
    </p>
    <p v-if="isJob && posting.company">
      {{ posting.company.name }}<br />
      {{ posting.company.zip }} {{ posting.company.city }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting, ProjectPosting } from "api";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";

class Props {
  type = prop<"job" | "project">({ default: "job" });
  posting = prop<JobPosting | ProjectPosting>({});
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class PostingDetailLink extends Vue.with(Props) {
  get isJob(): boolean {
    return this.type === "job";
  }
}
</script>
