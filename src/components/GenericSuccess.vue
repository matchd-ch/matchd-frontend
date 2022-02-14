<template>
  <div
    class="flex items-center rounded-30 bg-green-5 border border-green-1 text-green-1 px-4 py-2 xl:py-4 xl:px-8 mb-10"
  >
    <OKIcon class="w-8 mr-3 shrink-0" />
    <span data-cy="GenericSuccess">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import OKIcon from "@/assets/icons/ok.svg";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    OKIcon,
  },
})
export default class GenericSuccess extends Vue {}
</script>
