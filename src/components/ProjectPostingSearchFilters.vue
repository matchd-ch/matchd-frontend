<template>
  <div class="project-posting-search-filters" :class="[{ 'is-open': isOpen }]">
    <div class="flex flex-col xl:flex-row xl:justify-between xl:items-center">
      <h1 class="text-display-xl-fluid flex-grow">Ich suche</h1>
      <div class="flex justify-center flex-shrink mt-4">
        <button @click="isOpen = !isOpen">
          <ArrowDown class="w-10 transition" :class="{ 'rotate-180': isOpen }" />
        </button>
      </div>
    </div>
    <form class="mt-10 xl:mt-0 block" :class="{ block: isOpen, hidden: !isOpen }">
      <slot :close-panel="closePanel" />
    </form>
  </div>
</template>

<script setup lang="ts">
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { ref, watch } from "vue";

const emits = defineEmits<{
  (event: "changeFilters"): void;
  (event: "isOpen", isOpen: boolean): void;
}>();
const isOpen = ref(false);

const closePanel = () => {
  isOpen.value = false;
};

watch(
  () => isOpen.value,
  () => {
    emits("isOpen", isOpen.value);
  }
);
</script>

<style lang="postcss" scoped>
.project-posting-search-filters {
  @apply p-4 xl:p-8;
  @apply text-white;

  &.is-open {
    height: 100vh;
    padding-top: 92px;
    margin-top: -76px;
    overflow-y: auto;
    @screen xl {
      padding-top: 102px;
      margin-top: -70px;
    }
  }

  & :deep(select) {
    @apply bg-white rounded-full px-4 py-2 appearance-none text-black;
  }
}
</style>
