<template>
  <div
    :id="`step-${step}`"
    class="step-wrapper grid grid-cols-8 lg:grid-cols-16 grid-rows-register gap-x-4 lg:gap-x-5 min-h-screen"
    :class="[disabled ? 'disabled' : '', theme === 'green' ? 'theme-green' : 'theme-pink']"
  >
    <div class="step-line-start"></div>
    <div
      class="step col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-2 flex items-center"
    >
      <div class="flex-grow">
        <h2
          class="step-heading relative text-heading-md flex items-center"
          :class="{ 'mb-12': $slots.default }"
        >
          <slot name="title" />
        </h2>
        <div v-if="$slots.default">
          <slot />
        </div>
      </div>
    </div>
    <div class="step-line-end"></div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  theme = prop<string>({ default: "green" });
  step = prop<string>({ default: "0" });
  disabled = prop<boolean>({ default: true });
}

@Options({})
export default class MatchdStep extends Vue.with(Props) {}
</script>

<style lang="css">
.step-wrapper {
  &:first-child {
    & .step-line-start {
      @apply hidden;
    }
  }

  &:last-child {
    & .step-line-end {
      @apply hidden;
    }

    & .step {
      &::before {
        @apply bottom-2/4;
      }
    }
  }
}

.step-wrapper.disabled {
  pointer-events: none;
  opacity: 0.7;
}

.step-line-start {
  content: "";
  @apply col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-1;
}

.step-line-end {
  @apply col-start-1 col-span-8 lg:col-start-5 lg:col-span-8 row-start-3;
}

.step-heading {
  &::before {
    @apply absolute;
    @apply inline-flex justify-center items-center;
    @apply rounded-full;
    @apply text-white text-heading-xs;

    counter-increment: step;
    content: counter(step);

    left: -58px;

    width: 36px;
    height: 36px;

    @screen lg {
      width: 66px;
      height: 66px;
      left: -98px;
      @apply text-heading-md;
    }
  }
}
.step-line-start,
.step-line-end,
.step {
  margin-left: 58px;
  @apply relative;

  &::before {
    content: "";
    @apply absolute;
    @apply top-0 bottom-0;
    width: 2px;
    left: -41px;
    @screen lg {
      left: -66px;
    }
  }

  @screen lg {
    margin-left: 98px;
  }
}

.theme-pink {
  & .step {
    &::before {
      @apply bg-pink-1;
    }
  }
  & .step-heading,
  & .step-line-start,
  & .step-line-end {
    @apply text-pink-1;

    &::before {
      @apply bg-pink-1;
    }
  }
}

.theme-green {
  & .step {
    &::before {
      @apply bg-green-1;
    }
  }
  & .step-heading,
  & .step-line-start,
  & .step-line-end {
    @apply text-green-1;

    &::before {
      @apply bg-green-1;
    }
  }
}
</style>
