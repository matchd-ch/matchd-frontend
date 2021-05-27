<template>
  <div
    class="flex items-center rounded-30 bg-pink-5 border border-negative text-negative px-4 py-2 xl:py-4 xl:px-8 mb-10"
  >
    <ErrorIcon class="w-8 mr-3 flex-shrink-0" /> <span><slot /></span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ErrorIcon from "@/assets/icons/error.svg";

@Options({
  components: {
    ErrorIcon,
  },
})
export default class GenericError extends Vue {}
</script>
