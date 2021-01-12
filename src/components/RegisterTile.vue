<template>
  <router-link :to="{}" class="register-tile">
    <div class="flex-grow flex justify-between">
      <slot />
      <IconArrow class="inline-block w-8 ml-2 text-black flex-shrink-0" />
    </div>
  </router-link>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import IconArrow from "@/assets/icons/arrow.svg";

@Options({
  components: {
    IconArrow,
  },
})
export default class RegisterTile extends Vue {}
</script>

<style scoped>
.register-tile {
  @apply flex items-center;
  @apply text-2xl text-white underline;
  @apply p-10 lg:p-14;
  @apply shadow-white;
  &::before {
    content: "";
    @apply lg:inline-block lg:align-top lg:pb-full lg:w-0;
  }
}
</style>
