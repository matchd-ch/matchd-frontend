<template>
  <div class="field" :class="{ 'field-invalid': errors }">
    <label :for="id" class="label"><slot name="label"/></label>
    <div class="form-element">
      <slot />
    </div>
    <div v-if="errors" class="text-negative text-paragraph-sm px-8 mt-2">
      {{ errors }}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  id = prop<string>({});
  errors = prop<string>({});
}

@Options({})
export default class MatchdField extends Vue.with(Props) {}
</script>

<style lang="css">
.label {
  @apply block px-8 mb-2;
  @apply font-medium;
}

.form-element input,
.form-element textarea {
  @apply block w-full bg-white rounded-30 px-8 py-4;
  @apply border border-white focus:border-black;
  @apply text-lg placeholder-black placeholder-opacity-100;
  @apply focus:outline-none;
  @apply transition-colors duration-300;
}

.field-invalid {
  & input,
  & textarea {
    @apply border-negative text-negative placeholder-negative;
  }
}
</style>
