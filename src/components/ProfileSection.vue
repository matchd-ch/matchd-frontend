<template>
  <section
    class="relative xl:flex-grow p-9 xl:flex"
    :class="{
      'border-green-1': !pink,
      'border-pink-1': pink,
      'pr-20': editStep,
    }"
  >
    <h2
      class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-1/4 break-normal"
      :class="{
        'text-green-1': !pink,
        'text-pink-1': pink,
      }"
    >
      {{ title }}
    </h2>
    <div class="xl:mb-0 xl:w-1/2">
      <slot />
    </div>
    <router-link
      v-if="editStep"
      :to="{ name: 'ProfileEdit', params: { step: editStep } }"
      class="absolute top-9 right-9"
    >
      <span class="material-icons">edit</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  pink = prop<boolean>({ default: false });
  title = prop<string>({ required: true });
  editStep = prop<string>({});
}
export default class ProfileSection extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
section:not(:last-of-type) {
  @apply border-b;
}
</style>
