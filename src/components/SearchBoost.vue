<template>
  <div class="search-boost flex flex-col xl:flex-row xl:justify-center">
    <SearchBoostSlider @changeValue="$emit('changeSoftBoost', $event)" :value="softBoost">
      {{ softBoostLabel }}
      <template v-slot:label-left>Keine</template>
      <template v-slot:label-right>100% Match</template>
    </SearchBoostSlider>
    <SearchBoostSlider
      @changeValue="$emit('changeTechBoost', $event)"
      :value="techBoost"
      class="mt-4 xl:mt-0 xl:ml-8"
    >
      {{ techBoostLabel }}
      <template v-slot:label-left>Keine</template>
      <template v-slot:label-right>100% Match</template>
    </SearchBoostSlider>
  </div>
</template>

<script lang="ts">
import SearchBoostSlider from "@/components/SearchBoostSlider.vue";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  techBoostLabel = prop<string>({ default: "Technische Skills" });
  softBoostLabel = prop<string>({ default: "Gemeinsamkeiten" });
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

<style lang="postcss" scoped>
@block search-boost {
  @apply xl:p-8;
  @apply xl:bg-white;
}
</style>
