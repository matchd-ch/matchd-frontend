<template>
  <router-link
    :to="{
      name: type === 'job' ? 'JobPostingCreate' : 'ProjectPostingCreate',
      params: { slug: posting.slug, step: 'schritt1' },
    }"
    class="hover:text-primary-1 transition-colors underline"
  >
    <h3 class="font-medium text-lg">
      {{ posting.displayTitle }} {{ isPublic(posting) ? "" : " (Entwurf)" }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </h3>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting, ProjectPosting } from "api";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { JobPostingState, ProjectPostingState } from "@/api/models/types";

class Props {
  type = prop<"job" | "project">({ default: "job" });
  posting = prop<JobPosting | ProjectPosting>({});
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class CompanypostingLink extends Vue.with(Props) {
  isPublic(posting: JobPosting | ProjectPosting): boolean {
    return posting.state === JobPostingState.Public || posting.state === ProjectPostingState.Public;
  }
}
</script>
