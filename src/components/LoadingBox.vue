<template>
  <div class="loading-box relative">
    <transition>
      <LoadingSpinner v-if="isLoading" class="spinner" :size="spinnerSize" />
      <slot v-else />
    </transition>
  </div>
</template>
<script setup lang="ts">
import LoadingSpinner from "./LoadingSpinner.vue";
withDefaults(
  defineProps<{
    isLoading?: boolean;
    spinnerSize?: string;
  }>(),
  {
    isLoading: false,
    spinnerSize: "60px",
  },
);
</script>
<style lang="postcss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.loading-box {
  min-height: inherit;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
