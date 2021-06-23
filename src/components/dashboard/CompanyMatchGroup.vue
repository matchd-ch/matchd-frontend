<template>
  <ul v-if="matches">
    <li v-for="(match, index) in matches" :key="index" class="link-list__item mb-4">
      <template v-if="isJobPosting">
        <h3 class="mb-2">
          {{ match.jobPosting.displayTitle }}
        </h3>
      </template>
      <template v-else>
        <h3 class="font-medium text-lg">{{ match.projectPosting.displayTitle }}</h3>
        <h4 class="text-sm">{{ match.projectPosting.projectType.name }}</h4>
      </template>

      <ul>
        <li v-for="student in match.students" :key="student.id" class="link-list__item">
          <router-link
            :to="{
              name: 'StudentDetail',
              params: { slug: student.slug },
              query: isJobPosting ? { jobPostingId: match.jobPosting.id } : null,
            }"
            class="hover:text-primary-1 transition-colors underline"
          >
            <p class="font-medium">
              <template v-if="student.firstName"
                >{{ student.firstName }} {{ student.lastName }}</template
              >
              <template v-if="!student.firstName">{{ student.nickname }}</template>
              <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
            </p>
          </router-link>
        </li>
        <li v-if="!isJobPosting && match.projectPosting.student">
          <router-link
            :to="{
              name: 'ProjectPostingDetail',
              params: { slug: match.projectPosting.slug },
            }"
            class="hover:text-primary-1 transition-colors underline font-medium"
          >
            <template v-if="match.projectPosting.student.firstName"
              >{{ match.projectPosting.student.firstName }}
              {{ match.projectPosting.student.lastName }}</template
            >
            <template v-if="!match.projectPosting.student.firstName">{{
              match.projectPosting.student.nickname
            }}</template>
            <ArrowFrontIcon class="xl:w-5 w-8 mr-2 xl:mr-1 mb-1 flex-shrink-0 inline-block" />
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  GroupedJobPostingMatching,
  GroupedProjectPostingMatching,
} from "@/models/CompanyDashboard";
import { Options, prop, Vue } from "vue-class-component";
import ArrowFrontIcon from "@/assets/icons/arrow-front.svg";

class Props {
  type = prop<"JobPosting" | "ProjectPosting">({ default: "JobPosting" });
  matches = prop<GroupedJobPostingMatching[] | GroupedProjectPostingMatching[]>({ required: true });
}
@Options({
  components: {
    ArrowFrontIcon,
  },
})
export default class CompanyMatchGroup extends Vue.with(Props) {
  get isJobPosting(): boolean {
    return this.type === "JobPosting";
  }
}
</script>

<style lang="postcss" scoped>
.link-list__item {
  @apply mb-2;
}
</style>
