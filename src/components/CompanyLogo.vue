<template>
  <div class="company-logo rounded-full">
    <img :src="replaceStack(url, 'logo')" :alt="`${name} Logo`" />
  </div>
</template>

<script lang="ts">
import { replaceStack } from "@/helpers/replaceStack";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  name = prop<string>({ required: true });
  url = prop<string>({ required: true });
}

@Options({})
export default class CompanyLogo extends Vue.with(Props) {
  replaceStack(url: string, stack: string): string {
    return replaceStack(url, stack);
  }
}
</script>

<style lang="postcss" scoped>
@block company-logo {
  @apply bg-white overflow-hidden;
  @apply relative;

  & img {
    @apply absolute top-1/2;
    transform: translateY(-50%);
  }

  &::before {
    content: "";
    @apply inline-block align-top pb-full w-0;
  }
}
</style>
