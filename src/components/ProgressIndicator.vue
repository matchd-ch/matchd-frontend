<template>
  <div
    :class="$style.progressIndicator"
    :style="[
      {
        ['--progress-indicator-percent']: progressFormatted.global,
        ['--progress-indicator-size']: `${size}px`,
        ['--progress-indicator-stroke-width']: `${strokeWidth}px`,
      },
    ]"
  >
    <svg :viewBox="`0 0 ${size} ${size}`" :class="$style.svg">
      <!-- <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        :class="$style.ring"
      />
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        :class="$style.progress"
      /> -->
      <path :d="path" :class="$style.ring" />
      <path :d="path" :class="$style.progress" />
    </svg>
    <span :class="$style.text">{{ progressFormatted.global }}%</span>
  </div>
</template>
<script setup lang="ts">
import useProgressIndicator from "@/helpers/useProgressIndicator";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: number;
    strokeWidth?: number;
  }>(),
  {
    size: 200,
    strokeWidth: 40,
  }
);
const { progressFormatted } = useProgressIndicator();

const path = computed(() => {
  const s = props.size;
  const sw = props.strokeWidth;
  const r = (s - sw) / 2;
  return `M${s / 2} ${sw / 2} a ${r} ${r} 0 0 1 0 ${r * 2} a ${r} ${r} 0 0 1 0 ${r * 2 * -1}`;
});
</script>
<style module lang="postcss">
@keyframes progress {
  0% {
    /* stroke-dasharray: 20%, 100%; */
  }
}
.progressIndicator {
  position: relative;
  width: var(--progress-indicator-size);
  height: var(--progress-indicator-size);
  background-color: black;
}
.svg {
  width: 100%;
  height: 100%;
}
.ring {
  fill: none;
  stroke: var(--color-primary-3);
  stroke-width: var(--progress-indicator-stroke-width);
}
.progress {
  fill: none;
  stroke: white;
  stroke-width: var(--progress-indicator-stroke-width);
  /* stroke-linecap: round; */
  /* stroke-dasharray: var(--progress-indicator-percent), 100%; */
  stroke-dasharray: 25 100;
  animation: progress 0.5s ease-out forwards;
}
.text {
  position: absolute;
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(var(--progress-indicator-size) / 3.5);
}
</style>
