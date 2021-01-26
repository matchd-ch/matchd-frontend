<template>
  <div class="bg-grey-4">
    <div class="register-student grid grid-cols-8 lg:grid-cols-16 gap-x-4 lg:gap-x-5 px-4 lg:px-5">
      <h1
        class="text-heading-90 text-green-1 col-span-full lg:fixed lg:transition-all lg:top-0"
        :class="{ 'attach-heading': attached }"
      >
        Registrierung
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class RegisterStudent extends Vue {
  attached = false;
  passwordFieldType = "password";
}
</script>

<style lang="css" scoped>
.attach-heading {
  top: 50%;
  transform: translateY(-50%);
  @apply text-display-sm;
}

.register-user {
  counter-reset: step;
}
</style>
