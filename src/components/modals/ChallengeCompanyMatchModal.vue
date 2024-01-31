<template>
  <MatchingModal v-if="user">
    <h2 class="text-heading-sm mb-3 px-8">Hey {{ user.firstName }}</h2>
    <p class="mb-3 px-8">
      Du hast im Matchd-Pool
      {{ isMentoring ? "ein spannendes Mentoring" : "eine spannende Challenge" }} gefunden – Yaay!
      Jetzt brauchen wir nur noch dein Okay und
      <strong>{{ challenge.employee?.firstName }} {{ challenge.employee?.lastName }}</strong>
      von <strong>{{ challenge.company?.name }}</strong> erhält den Link zu deinem Matchd-Profil.
    </p>

    <div class="flex items-center">
      <MatchdToggle id="permissionGranted">
        <template #label>Deine Kontaktdaten und Zertifikate freigeben</template>
        <input id="permissionGranted" v-model="permissionGranted" type="checkbox" />
        <template #value>
          <span :class="{ 'text-primary-1': permissionGranted }">Einverstanden</span>
        </template>
      </MatchdToggle>
    </div>

    <template #footer>
      <MatchdButton
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="emits('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton
        :disabled="!permissionGranted"
        :loading="loading"
        class="block w-full md:w-auto"
        @click="emits('clickConfirm')"
      >
        <template v-if="matchType === MatchTypeEnum.HalfMatch">Bestätigen</template>
        <template v-else>Freigeben</template>
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import type { ChallengeChallengeFragment } from "@/api/queries/challengeFragment.generated";
import type { MeQuery } from "@/api/queries/me.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import useChallengeMentoring from "@/composables/useChallengeMentoring";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ref } from "vue";

withDefaults(
  defineProps<{
    user: MeQuery["me"];
    challenge: ChallengeChallengeFragment;
    loading?: boolean;
    matchType: MatchTypeEnum;
  }>(),
  {
    loading: false,
  },
);

const emits = defineEmits<{
  (event: "clickConfirm"): void;
  (event: "clickCancel"): void;
}>();
const permissionGranted = ref(false);
const { isMentoring } = useChallengeMentoring();
</script>
