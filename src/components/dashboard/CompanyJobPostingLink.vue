<template>
  <router-link
    :to="{ name: 'JobPostingCreate', params: { slug: jobPosting.slug, step: 'schritt1' } }"
  >
    <p class="font-bold">
      {{ jobPosting.title }} {{ isPublic(jobPosting) ? "" : " (Entwurf)" }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </p>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting } from "api";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";
import { JobPostingState } from "@/api/models/types";

class Props {
  jobPosting = prop<JobPosting>({});
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class CompanyJobPostingLink extends Vue.with(Props) {
  isPublic(jobPosting: JobPosting): boolean {
    return jobPosting.state === JobPostingState.Public;
  }
}
</script>
