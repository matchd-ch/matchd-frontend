<template>
  <div
    class="select-pill-group transition-colors"
    :class="{ 'select-pill-group--invalid': errors }"
  >
    <label v-if="$slots.label" class="select-pill-group__label">
      <slot name="label" />
    </label>
    <slot name="field" />
    <ul class="flex flex-wrap -m-2">
      <slot />
    </ul>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">{{ errors }}</div>
    <p v-if="$slots.info" class="text-paragraph-sm text-black mt-4 flex items-center px-8">
      <IconInfo class="shrink-0 w-5 mr-2" />
      <slot name="info" />
    </p>
  </div>
</template>

<script setup lang="ts">
import IconInfo from "@/assets/icons/info.svg";

withDefaults(
  defineProps<{
    errors?: string;
  }>(),
  {
    errors: "",
  },
);
</script>

<style lang="postcss" scoped>
@block select-pill-group {
  @modifier invalid {
    & :deep(.select-pill) {
      @apply text-negative;
    }
  }

  @element label {
    @apply block px-8 mb-2;
    @apply font-medium text-primary-1;
  }
}
</style>
