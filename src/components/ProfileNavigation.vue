<template>
  <ul class="profile-navigation p-8 flex justify-center bg-white">
    <template v-if="type === 'student'">
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt1' } }" class="text-primary-1">
          Persönliche Daten
        </router-link>
      </li>
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt2' } }" class="text-primary-1">
          Was ich suche
        </router-link>
      </li>
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt3' } }" class="text-primary-1">
          So bin ich
        </router-link>
      </li>
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt4' } }" class="text-primary-1">
          Das habe ich drauf
        </router-link>
      </li>
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt5' } }" class="text-primary-1">
          Nickname & Foto
        </router-link>
      </li>
      <li class="mr-4">
        <router-link :to="{ params: { step: 'schritt6' } }" class="text-primary-1">
          Profilstatus
        </router-link>
      </li>
    </template>
    <template v-else-if="type === 'company'"> company </template>
    <template v-else> something else </template>
  </ul>
</template>

<script lang="ts">
import { Options, prop, Vue } from "vue-class-component";

class Props {
  type = prop<string>({});
}

@Options({})
export default class ProfileNavigation extends Vue.with(Props) {}
</script>

<style lang="postcss" scoped></style>
