<template>
  <div v-if="company.data" class="company-detail grid grid-cols-1 xl:grid-cols-2 xl:min-h-screen">
    <div
      class="bg-company-gradient-t-b text-white p-9 flex flex-col border-b xl:border-b-0 xl:border-r border-pink-1"
    >
      <div class="xl:flex items-start">
        <div class="w-1/2">
          <img
            v-if="company.logo[0]"
            :src="company.logo[0].url.replace('{stack}', 'logo')"
            :alt="`Logo ${company.data.name}`"
            class="w-40"
            style="filter: brightness(0) invert(1);"
          />
        </div>
        <address class="mt-5 xl:mt-0 not-italic xl:border-l border-white xl:pl-6">
          {{ company.data.street }}<br />
          {{ company.data.zip }} {{ company.data.city }}<br />
          <a :href="company.data.website" target="_blank" class="underline">{{
            company.data.website
          }}</a
          ><br /><a :href="`mailto:${company.data.employees[0].user.email}`" class="underline">{{
            company.data.employees[0].user.email
          }}</a
          ><br />
          <a :href="`tel:${company.data.phone}`">{{ company.data.phone }}</a>
        </address>
      </div>
      <div v-if="company.media[0]" class="square-image mt-8 relative">
        <img
          :src="company.media[0].url.replace('{stack}', 'company-detail-media')"
          class="w-full h-full absolute"
          :alt="`Impressionen ${company.data.name}`"
        />
      </div>
    </div>
    <div class="text-pink-1 flex flex-col min-h-full">
      <section class="flex-grow border-b border-pink-1 p-9">
        <h2 class="text-heading-lg mb-8">Über uns</h2>
        <p v-html="nl2br(company.data.description)"></p>
      </section>
      <section v-if="company.data.services" class="flex-grow border-b border-pink-1 p-9 xl:flex">
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">
          Unsere Produkte und Services
        </h2>
        <p class="xl:w-1/2">{{ company.data.services }}</p>
      </section>
      <section
        v-if="company.data.jobPositions && company.data.jobPositions.length > 0"
        class="flex-grow border-b border-pink-1 p-9 xl:flex"
      >
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">
          In diesen Bereichen kannst du bei uns tätig sein
        </h2>
        <ul class="w-1/2 list-inside list-disc">
          <li v-for="jobPosition in company.data.jobPositions" :key="jobPosition.id">
            {{ jobPosition.name }}
          </li>
        </ul>
      </section>
      <section class="flex-grow border-b border-pink-1 p-9 xl:flex">
        <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">
          Das erwartet dich bei uns
        </h2>
        <template v-if="company.data.benefits.length > 0">
          <ul class="xl:w-1/2 flex flex-wrap content-start items-start -mb-1">
            <li
              v-for="benefit in company.data.benefits"
              :key="benefit.id"
              class="flex items-center border border-pink-1 rounded-full font-medium text-sm py-3 px-4 mx-1 mb-2"
            >
              <span class="material-icons mr-2">{{ benefit.icon }}</span>
              {{ benefit.name }}
            </li>
          </ul>
        </template>
      </section>
      <section class="flex-grow p-9">
        <h2 class="text-heading-lg mb-8">Offene Stellen</h2>
        <ul>
          <li class="text-link-md underline">
            <router-link :to="{ name: 'Home' }">Platzhaltertext</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdFileUpload from "@/components/MatchdFileUpload.vue";
import MatchdFileView from "@/components/MatchdFileView.vue";
import { ActionTypes } from "@/store/modules/content/action-types";
import { Options, Vue } from "vue-class-component";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

Vue.registerHooks(["beforeRouteUpdate"]);

@Options({
  components: {
    MatchdButton,
    MatchdFileUpload,
    MatchdFileView,
  },
})
export default class CompanyDetail extends Vue {
  get company() {
    return this.$store.getters["company"];
  }

  nl2br(text: string) {
    return text.replace(new RegExp(/\n/, "g"), "<br />");
  }

  async beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    if (to.params.slug) {
      await this.loadData(String(to.params.slug));
    }
    next();
  }

  async mounted() {
    if (this.$route.params.slug) {
      await this.loadData(String(this.$route.params.slug));
    }
  }

  async loadData(slug: string) {
    try {
      await this.$store.dispatch(ActionTypes.COMPANY, { slug });
    } catch (e) {
      this.$router.replace("/404");
    }
  }
}
</script>

<style>
.square-image {
  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
}
</style>
