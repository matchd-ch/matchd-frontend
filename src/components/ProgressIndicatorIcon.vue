<template>
  <span class="progress-indicator-icon">
    {{ label }}
    <span v-if="progress !== undefined && progress < 1" class="progress">
      ({{ formatProgress(progress) }})
    </span>
  </span>
</template>
<script setup lang="ts">
import useProgressIndicator from "@/helpers/useProgressIndicator";
withDefaults(
  defineProps<{
    label?: string;
    progress?: number;
  }>(),
  {
    label: undefined,
    progress: undefined,
  },
);
const { formatProgress } = useProgressIndicator();
</script>
<style scoped lang="postcss">
.progress-indicator-icon {
  display: flex;
  .progress {
    display: flex;
    align-items: center;
    transform: translateY(1px);
    justify-content: bottom;
    box-sizing: border-box;
    line-height: 0;
    border-radius: 50%;
    @apply text-black;
    @apply text-xs;

    margin-left: 6px;
    font-weight: 600;
  }
}
</style>
