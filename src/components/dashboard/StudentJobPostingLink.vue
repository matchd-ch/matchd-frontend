<template>
  <router-link
    :to="{ name: 'JobPostingDetail', params: { slug: jobPosting.slug } }"
    class="hover:text-primary-1 transition-colors"
  >
    <h3 class="font-medium text-lg">
      {{ jobPosting.displayTitle }} {{ jobPosting.state === "PUBLIC" ? "" : " (Entwurf)" }}
      <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </h3>
    <p>
      {{ jobPosting.company.name }}<br />
      {{ jobPosting.company.zip }} {{ jobPosting.company.city }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import type { JobPosting } from "api";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";

class Props {
  jobPosting = prop<JobPosting>({});
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class StudentJobPostingLink extends Vue.with(Props) {}
</script>
