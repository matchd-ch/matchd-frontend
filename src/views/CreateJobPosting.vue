<template>
  <div class="jobposting min-h-screen text-primary-1">
    <div class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 lg:border-b">
      <h1
        class="text-display-xl-fluid col-start-1 col-span-4 row-start-1 border-r flex items-center px-4 lg:px-5 py-10"
      >
        Stelle
      </h1>
      <div
        class="col-start-5 col-span-4 row-start-1 text-display-xl-fluid lg:hidden flex items-center justify-center px-4 lg:px-5 py-10"
      >
        <template v-if="currentStep <= 6">{{ currentStep }}</template>
      </div>
      <h2
        class="text-display-xs-fluid flex items-center col-start-1 lg:col-start-5 col-span-8 row-start-3 lg:row-start-1 border-t lg:border-t-0 lg:border-r flex items-center px-4 lg:px-8 py-10"
      >
        xx
      </h2>
      <div class="col-start-13 col-span-4 hidden lg:block"></div>
    </div>
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <component
        :is="currentJobpostingComponent"
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class JobPosting extends Vue {
  currentJobpostingComponent = "";
  get currentStep() {
    return this.$store.getters["user"]?.profileStep;
  }
}
</script>

<style></style>
