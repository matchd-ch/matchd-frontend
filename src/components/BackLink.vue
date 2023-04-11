<template>
  <router-link
    :to="to"
    class="text-paragraph-lg flex items-center hover:text-primary-1 transition-colors py-4"
  >
    <ArrowBack class="w-5 mr-2 flex-shrink-0 inline-block" />
    Zurück
  </router-link>
</template>

<script lang="ts">
import ArrowBack from "@/assets/icons/arrow-back.svg";
import { Options, prop, Vue } from "vue-class-component";
import type { RouteLocationRaw } from "vue-router";

class Props {
  to = prop<RouteLocationRaw>({ required: true });
}

@Options({
  components: {
    ArrowBack,
  },
})
export default class BackLink extends Vue.with(Props) {}
</script>
