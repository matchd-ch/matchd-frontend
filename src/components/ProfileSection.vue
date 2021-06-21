<template>
  <section
    class="profile-section relative xl:flex-grow p-9 xl:flex"
    :class="{
      'border-green-1': !pink,
      'border-pink-1': pink,
      'pr-20': editStep,
    }"
  >
    <h2
      class="text-heading-lg mb-8 xl:mb-0 xl:w-1/2 xl:pr-8 2xl:pr-1/4 break-normal"
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
    <routerSection v-if="editStep" :editStep="editStep" route="ProfileEdit"> </routerSection>
  </section>
</template>

<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import RouterSection from "@/components/routerSection.vue";

class Props {
  pink = prop<boolean>({ default: false });
  title = prop<string>({ required: true });
  editStep = prop<string>({});
}

@Options({
  components: {
    RouterSection,
  },
})
export default class ProfileSection extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped>
@block profile-section {
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
