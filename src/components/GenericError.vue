<template>
  <div
    class="flex items-center rounded-30 bg-pink-5 border border-negative text-negative px-4 py-2 xl:py-4 xl:px-8 mb-10"
  >
    <ErrorIcon class="w-8 mr-3 shrink-0" />
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import ErrorIcon from "@/assets/icons/error.svg";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ErrorIcon,
  },
})
export default class GenericError extends Vue {}
</script>
