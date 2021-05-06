<template>
  <router-link :to="{ path: '/stellen/' + jobPosting.slug }">
    <p class="font-bold">
      {{ jobPosting.title }} {{ jobPosting.state === 'PUBLIC' ? "" : " (Entwurf)"}}
      <ArrowFront class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
    </p>
    <p>
      {{ jobPosting.company.name }}<br/>
      {{ jobPosting.company.zip }} {{ jobPosting.company.city }}
    </p>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from 'vue-class-component';
import type { JobPosting } from "api";
import ArrowFront from "@/assets/icons/arrow-front.svg";

class Props {
  jobPosting = prop<JobPosting>({});
}
@Options({
  components: {
    ArrowFront
  },
})
export default class StudentJobPostingLink extends Vue.with(Props) {}
</script>

<style scoped>

</style>
