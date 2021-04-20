<template>
  <section :class="borderColor" class="flex-grow border-b p-9 xl:flex">
    <h2 class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/6">{{ title }}</h2>
    <div class="xl:mb-0 xl:w-1/2">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  borderColor = prop<string>({ default: "border-green-1" });
  title = prop<string>({ required: true });
}
export default class ProfileSection extends Vue.with(Props) {}
</script>

<style scoped></style>
