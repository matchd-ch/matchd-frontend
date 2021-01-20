<template>
  <div :id="`step-${step}`" class="step col-start-5 col-span-8 min-h-screen flex items-center">
    <div class="flex-grow">
      <h2
        class="step-heading relative text-heading-md flex items-center text-pink-1"
        :class="{ 'mb-12': $slots.default }"
      >
        <slot name="title" />
      </h2>
      <div v-if="$slots.default">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  theme = prop<string>({ default: "green" });
  step = prop<string>({ default: "0" });
}

@Options({})
export default class MatchdStep extends Vue.with(Props) {}
</script>

<style lang="css">
.step-heading {
  &::before {
    position: absolute;
    right: 100%;
    counter-increment: step;
    content: counter(step);
    width: 66px;
    height: 66px;
    @apply mr-8;
    @apply inline-flex justify-center items-center;
    @apply rounded-full bg-pink-1;
    @apply text-white text-heading-md;
  }
}

.step {
  &.disabled {
    @apply pointer-events-none;
  }
  &:not(:last-child) {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: calc(100% + 32px);
      width: 2px;
      @apply mr-8;
      @apply bg-pink-1;
    }
  }
}
</style>
