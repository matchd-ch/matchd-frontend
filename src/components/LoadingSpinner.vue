<template>
  <div class="loading-spinner text-center">
    <LoadingSvg :class="[`w-[${size}]`, `h-[${size}]`]" />
  </div>
</template>
<script setup lang="ts">
import LoadingSvg from "@/assets/icons/loading.svg";

withDefaults(
  defineProps<{
    size?: string;
  }>(),
  {
    size: "60px",
  }
);
</script>
<style lang="postcss" scoped>
@block loading-spinner {
  & svg {
    @apply inline-block;
    color: var(--color-primary-1);
    @apply animate-spin;
    fill: var(--color-primary-3);
    border-radius: 50%;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
