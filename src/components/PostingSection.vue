<template>
  <section
    class="posting-section flex-grow lg:flex border-b border-orange-1 p-9 lg:p-0 relative"
    :class="{
      'pr-20': editStep,
    }"
  >
    <div class="lg:w-1/2 lg:p-9 lg:border-r lg:border-orange-1">
      <h2 class="text-heading-lg mb-8 lg:mb-0 text-orange-1">{{ title }}</h2>
    </div>
    <div class="xl:mb-0 xl:w-1/2">
      <slot />
    </div>
    <router-link
      v-if="editStep"
      :to="{ name: 'ProjectPostingCreate', params: { slug: slug, step: editStep } }"
      class="posting-section__button absolute top-9 right-9 rounded-full border border-black w-10 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-colors"
    >
      <span class="material-icons">edit</span>
    </router-link>
  </section>
</template>

<script lang="ts">
import { Vue, prop } from "vue-class-component";

class Props {
  title = prop<string>({ required: true });
  editStep = prop<string>({});
  slug = prop<string>({});
}
export default class PostingSection extends Vue.with(Props) {}
</script>
<style lang="postcss" scoped>
@block posting-section {
  &:not(:last-of-type) {
    @apply border-b;
  }

  @element button {
    @apply transition-all;

    &:hover {
      box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
