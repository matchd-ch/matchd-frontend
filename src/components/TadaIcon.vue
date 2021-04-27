<template>
  <span class="block tada">🎉</span>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ErrorIcon from "@/assets/icons/error.svg";

@Options({
  components: {
    ErrorIcon,
  },
})
export default class TadaIcon extends Vue {}
</script>

<style lang="postcss">
@keyframes tada {
  0% {
    transform: scale(1);
  }
  10%,
  20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}
</style>

<style lang="postcss" scoped>
.tada {
  animation: tada 800ms infinite;
}
</style>
