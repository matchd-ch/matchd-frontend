<template>
  <div class="loading-spinner text-center">
    <LoadingSvg :class="[`w-[${size}]`, `h-[${size}]`]" />
  </div>
</template>
<script setup lang="ts">
import LoadingSvg from "@/assets/icons/loading.svg";
</script>
<style lang="postcss" scoped>
@block loading-spinner {
  & svg {
    @apply inline-block;
    color: var(--color-primary-1);
    fill: var(--color-primary-3);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    @apply animate-spin;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
