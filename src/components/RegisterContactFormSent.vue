<template>
  <div class="register-contact-form-sent">
    <h2 class="text-display-xs mb-6" :class="{ 'text-black': textBlack, 'text-white': !textBlack }">
      Vielen Dank für deine Anfrage.
    </h2>
    <p class="mb-9" :class="{ 'text-black': textBlack, 'text-white': !textBlack }">
      Wir melden uns umgehend bei dir.<br />
      Stay tuned! Dein Matchd-Team
    </p>
    <p v-if="linkRoute">
      Zurück zum
      <router-link :to="{ name: linkRoute }" class="underline">{{ linkName }}</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { prop, Vue } from "vue-class-component";

class Props {
  textBlack = prop<boolean>({});
  linkRoute = prop<boolean>({});
  linkName = prop<boolean>({});
}

export default class RegisterContactFormSent extends Vue.with(Props) {}
</script>
