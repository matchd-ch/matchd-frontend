<template>
  <component
    :is="tag"
    class="btn relative overflow-hidden rounded-full font-medium text-xl py-3 px-6 xl:px-10 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50"
    :class="[variant, size, active ? 'active' : '']"
  >
    <Loading v-if="loading" />
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import Loading from "@/assets/icons/loading.svg";

class Props {
  tag = prop<string>({ default: "button" });
  variant = prop<string>({ default: "fill" });
  loading = prop<boolean>({ default: false });
  active = prop<boolean>({ default: false });
  size = prop<string>({ default: "" });
}

@Options({
  components: {
    Loading,
  },
})
export default class MatchdButton extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
.btn {
  @apply transition-all;

  &:disabled {
    @apply opacity-60;
    @apply cursor-default;
  }

  & svg {
    @apply inline-block;
    @apply text-primary-1;
    @apply animate-spin;
    width: 30px;
    height: 30px;
    fill: black;
    transition: fill 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &.xl {
    @apply text-display-md font-normal;
    @apply py-8 px-14;
    @apply border-2;
  }

  &.fill {
    & svg {
      fill: white;
      @apply text-primary-1;
    }
  }
}

.fill {
  @apply bg-black text-white border border-black;

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply bg-white border-black;
      @apply text-black;

      & svg {
        fill: black;
      }
    }
  }
}

.outline {
  @apply border border-black;
  @apply text-black;

  &:not(:disabled) {
    &:hover,
    &:focus,
    &.active {
      @apply text-white bg-black;

      & svg {
        fill: white;
      }
    }
  }
}
</style>
