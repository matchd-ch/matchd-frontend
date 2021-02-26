<template>
  <div class="onboarding min-h-screen text-green-1">
    <div class="grid grid-cols-8 lg:grid-cols-16 lg:grid-rows-home gap-x-4 lg:gap-x-5 lg:border-b">
      <h1
        class="text-display-xl-fluid col-start-1 col-span-4 row-start-1 border-r flex items-center px-4 lg:px-5 py-10"
      >
        Profil
      </h1>
      <div
        class="col-start-5 col-span-4 row-start-1 text-display-xl-fluid lg:hidden flex items-center justify-center px-4 lg:px-5 py-10"
      >
        <template v-if="currentStep <= 6">{{ currentStep }}</template>
      </div>
      <h2
        class="text-display-xs-fluid flex items-center col-start-1 lg:col-start-5 col-span-8 row-start-3 lg:row-start-1 border-t lg:border-t-0 lg:border-r flex items-center px-4 lg:px-8 py-10"
      >
        <span v-if="currentStep <= 6" class="text-display-xl-fluid mr-8 hidden lg:inline">{{
          currentStep
        }}</span>
        <template v-if="currentStep === 1">Vervollständige deine persönlichen Daten</template>
        <template v-else-if="currentStep === 2">Welche Schule oder Uni besuchst du?</template>
        <template v-else-if="currentStep === 3">Wonach suchst du?</template>
        <template v-else-if="currentStep === 4"
          >Ergänze deine Skills und zeige, was du drauf hast.</template
        >
        <template v-else-if="currentStep === 5">Kreiere dein Matchd Profil</template>
        <template v-else-if="currentStep === 6">Veröffentliche dein Profil</template>
        <template v-else-if="currentStep > 6"
          >Herzliche Gratulation!<br />Dein Matchd-Profil ist vollständig!
        </template>
      </h2>
      <div class="col-start-13 col-span-4 hidden lg:block"></div>
    </div>
    <div class="grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5">
      <router-view
        class="col-start-1 lg:col-start-5 col-span-full lg:col-span-8 lg:px-8 px-4 lg:px-5 py-12"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Onboarding extends Vue {
  get currentStep() {
    return this.$store.getters["user"]?.profileStep;
  }
}
</script>

<style></style>
