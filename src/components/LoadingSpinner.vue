<template>
  <div class="loading-spinner text-center" :style="`--size: ${size}`">
    <LoadingSvg class="svg" />
  </div>
</template>
<script setup lang="ts">
import LoadingSvg from "@/assets/icons/loading.svg";
withDefaults(defineProps<{ size?: string }>(), {
  size: "60px",
});
</script>
<style lang="postcss" scoped>
@function toRGB($color) {
  @return "rgba(" + red($color) + ", " + green($color) + ", " + blue($color) + ", " + $alpha + ")";
}

@block loading-spinner {
  --size: 60px;
  & svg {
    @apply inline-block;
    color: var(--color-primary-1);
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
    @apply animate-spin;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    :deep(#icon-loader-ring) {
      fill-opacity: 0.3;
    }
  }
}
</style>
