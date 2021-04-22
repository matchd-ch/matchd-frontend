<template>
  <section
    :class="{
      'border-green-1': !pink,
      'border-pink-1': pink,
    }"
    class="flex-grow p-9 xl:flex"
  >
    <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4">{{ title }}</h2>
    <div class="xl:mb-0 xl:w-1/2">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  pink = prop<boolean>({ default: false });
  title = prop<string>({ required: true });
}
export default class ProfileSection extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
section:not(:last-of-type) {
  @apply border-b;
}
</style>
