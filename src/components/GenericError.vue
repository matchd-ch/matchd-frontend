<template>
  <div
    class="flex items-center rounded-full bg-negative-light border border-negative text-negative py-4 px-8 mb-10"
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
