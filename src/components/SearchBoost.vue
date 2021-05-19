<template>
  <div class="search-boost flex flex-col xl:flex-row xl:justify-center">
    <SearchBoostSlider
      @changeValue="$emit('changeSoftBoost', $event)"
      :color="color"
      :value="softBoost"
      >Übereinstimmung Werte</SearchBoostSlider
    >
    <SearchBoostSlider
      @changeValue="$emit('changeTechBoost', $event)"
      :color="color"
      :value="techBoost"
      class="xl:mt-0 xl:ml-8"
      >Übereinstimmung Skills</SearchBoostSlider
    >
  </div>
</template>

<script lang="ts">
import SearchBoostSlider from "@/components/SearchBoostSlider.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  color = prop<string>({ default: "green" });
  techBoost = prop<number>({ default: 3 });
  softBoost = prop<number>({ default: 3 });
}

@Options({
  components: {
    SearchBoostSlider,
  },
  emits: ["changeSoftBoost", "changeTechBoost"],
})
export default class SearchBoost extends Vue.with(Props) {}
</script>

<style type="postcss" scoped>
@block search-boost {
  @apply p-4 xl:p-8;
  @apply bg-white;
}
</style>
