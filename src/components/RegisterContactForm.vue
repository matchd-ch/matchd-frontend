<template>
  <div class="register-contact-form">
    <slot></slot>
    <Form v-slot="{ errors }" @submit="$emit('submit', $event)">
      <div class="mb-6">
        <label for="name" class="sr-only">Dein Name</label>
        <Field
          id="name"
          v-model="form.name"
          name="name"
          as="input"
          placeholder="Dein Name"
          label="Name"
          rules="required"
          class="form-input"
          :class="{ invalid: errors.name }"
        />
      </div>
      <div class="mb-6">
        <label for="email" class="sr-only">Deine E-Mail</label>
        <Field
          id="email"
          v-model="form.email"
          name="email"
          type="email"
          as="input"
          placeholder="Deine E-Mail"
          label="E-Mail"
          rules="required|email"
          class="form-input"
          :class="{ invalid: errors.email }"
        />
      </div>
      <div class="mb-6">
        <label for="message" class="sr-only">Nachricht</label>
        <Field
          id="message"
          name="message"
          as="textarea"
          placeholder="Nachricht"
          label="Nachricht"
          rules="required"
          class="form-textarea"
          maxlength="3000"
          :class="{ invalid: errors.message }"
        />
      </div>
      <div>
        <MatchdButton
          type="submit"
          :disabled="loading"
          :loading="loading"
          class="block w-full"
          :variant="buttonVariantOutline ? 'outline' : 'fill'"
          ><slot name="button-label"
        /></MatchdButton>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import { Options, prop, Vue } from "vue-class-component";
import { Form, Field, ErrorMessage } from "vee-validate";

class Props {
  loading = prop<boolean>({});
  name = prop<string>({});
  email = prop<string>({});
  buttonVariantOutline = prop<boolean>({});
}

@Options({
  components: {
    MatchdButton,
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit"],
})
export default class RegisterContactForm extends Vue.with(Props) {
  form = {
    name: "",
    email: "",
  };

  mounted(): void {
    this.form = {
      name: this.name || "",
      email: this.email || "",
    };
  }
}
</script>

<style lang="postcss" scoped>
.form-input {
  @apply block w-full bg-white rounded-30 px-8 py-4;
  @apply text-lg placeholder-black placeholder-opacity-40 border-2 border-white;
  @apply focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50;
  &.invalid {
    @apply border-negative text-negative placeholder-negative;
  }
}
.form-textarea {
  @apply block w-full min-h-145px bg-white rounded-30 px-8 py-5;
  @apply text-lg placeholder-black placeholder-opacity-40 resize-none border-2 border-white;
  @apply focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50;
  &.invalid {
    @apply border-negative text-negative placeholder-negative;
  }
}
</style>
