<template>
  <router-link :to="to" class="register-tile">
    <div class="flex-grow flex justify-between">
      <slot />
      <IconArrow class="inline-block w-8 ml-2 text-black flex-shrink-0" />
    </div>
  </router-link>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";
import IconArrow from "@/assets/icons/arrow.svg";

class Props {
  to = prop<string>({ default: undefined });
}

@Options({
  components: {
    IconArrow,
  },
})
export default class RegisterTile extends Vue.with(Props) {}
</script>

<style scoped>
.register-tile {
  @apply flex items-center;
  @apply text-2xl text-white underline;
  @apply p-10 xl:p-14;
  @apply shadow-white outline-none;
  &::before {
    content: "";
    @apply xl:inline-block xl:align-top xl:pb-full xl:w-0;
  }
}
</style>
