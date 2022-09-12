<template>
  <div class="px-4 lg:px-5">
    <BackLink :to="{ name: Routes.DASHBOARD }" class="fixed" />
  </div>
  <div
    id="nichts-passendes-gefunden"
    class="max-w-screen-sm mx-auto min-h-screen flex items-center p-10 xl:p-0"
  >
    <RegisterContactForm
      v-if="!contactFormSent"
      :loading="contactFormLoading"
      class="grow"
      :button-variant-outline="true"
      :name="fullName"
      :email="user?.email"
      @submit="onSubmit"
    >
      <h2 class="text-black text-display-xs mb-6">Get in touch</h2>
      <p class="text-black mb-9">
        Du fragst dich, welche Troll-Fabriken hinter unserem hochkomplexen Matchmaking-Algorithmus
        stecken? Tja, das bleibt wohl unser Geheimnis. Für alle anderen Fragen, schreib uns!
      </p>
      <template #button-label>Senden</template>
    </RegisterContactForm>

    <RegisterContactFormSent v-else>
      <h2 class="text-display-xs mb-6 text-black">Merci für die Anfrage 📩</h2>
      <p class="mb-9 text-black">
        Unser Postfach ist gut gefüttert, wir antworten so schnell wie möglich – Stay tuned.
      </p>
      <p>
        Zurück zum
        <router-link :to="{ name: linkRoute }" class="underline">{{ linkName }}</router-link>
      </p>
    </RegisterContactFormSent>
  </div>
</template>

<script setup lang="ts">
import type { UserRequestInput } from "@/api/models/types";
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/registration/action-types";
import { computed } from "vue";
import { useMeta } from "vue-meta";

const meta = useMeta({
  title: "Kontakt",
});

const store = useStore();

const user = computed(() => {
  return store.getters["user"];
});

const fullName = computed(() => {
  if (user.value) {
    return `${user.value.firstName} ${user.value.lastName}`;
  }
  return undefined;
});

const linkRoute = computed(() => {
  if (user.value) {
    return Routes.DASHBOARD;
  }
  return Routes.LOGIN;
});

const linkName = computed(() => {
  if (user.value) {
    return Routes.DASHBOARD;
  }
  return Routes.LOGIN;
});

const contactFormLoading = computed(() => store.getters["contactFormSending"]);

const contactFormSent = computed(() => store.getters["contactFormSent"]);

const onSubmit = async (form: UserRequestInput) => {
  store.dispatch(ActionTypes.SEND_REGISTRATION_CONTACT_FORM, {
    ...form,
  });
};
</script>

<style></style>
