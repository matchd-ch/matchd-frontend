<template>
  <div class="search-filters flex flex-col xl:flex-row xl:justify-between xl:items-center">
    <h1 class="text-display-xl-fluid">Ich suche</h1>

    <form
      class="mt-10 xl:mt-0 xl:grow xl:max-w-3xl xl:block"
      :class="{ block: open, hidden: !open }"
    >
      <slot />
    </form>
    <div class="search-filters__display-toggles">
      <slot name="display-toggles" />
    </div>
    <div class="flex justify-center mt-4 xl:hidden">
      <button @click="open = !open">
        <ArrowDown class="w-8 transition" :class="{ 'rotate-180': open }" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ArrowDown,
  },
  emits: ["changeFilters"],
})
export default class SearchFilters extends Vue {
  open = false;
  techBoost = 3;
  softBoost = 3;
}
</script>

<style lang="postcss" scoped>
@block search-filters {
  @apply p-4 xl:p-8;
  @apply text-white;

  & :deep(select) {
    @apply bg-white rounded-full px-4 py-2 appearance-none text-black;
  }
}
</style>
