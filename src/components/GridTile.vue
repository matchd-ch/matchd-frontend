<template>
  <div class="search-result-grid__image-wrap">
    <div class="search-result-grid__image-box rounded-full border-2">
      <img :src="imgSrc" class="w-full" :alt="imgAlt" />
    </div>
    <div v-if="match.matchStatus?.initiator" class="search-result-grid__match-status-helper">
      <div class="search-result-grid__match-status">
        <span v-if="match.matchStatus.confirmed" class="material-icons">people</span>
        <span v-else class="material-icons">record_voice_over</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Match } from "api";
import { Vue, prop } from "vue-class-component";

class Props {
  match = prop<Match>({ required: true });
  imgSrc = prop<string>({ required: true });
  imgAlt = prop<string>({ required: true });
}
export default class ProfileSection extends Vue.with(Props) {}
</script>

<style scoped></style>
