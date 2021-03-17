<template>
  <div class="company-detail">
    {{ company }}
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
    await this.$store.dispatch(ActionTypes.COMPANY, { slug });
  }
}
</script>

<style></style>
