<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3">Hallo {{ user?.firstName }} {{ user?.lastName }}</h2>
    <p class="mb-3">
      <template v-if="matchType === matchTypeEnum.HalfMatch">
        Nach dem Klick auf "Match bestätigen" informieren wir
        <strong>{{ student.firstName || student.nickname }}</strong
        >, dass sie ebenfalls interessiert sind. Zusätzlich geben wir ihnen die Kontaktdaten von
        <strong>{{ student.firstName || student.nickname }}</strong> frei.
      </template>
      <template v-else>
        Cool! Das ist der erste Schritt zum gegenseitigen Matching. Nach dem Klick auf "Match
        starten", bekommt
        <strong>{{ student.firstName || student.nickname }}</strong> den Link zur ausgewählten
        Stelle.<br /><br />Sobald <strong>{{ student.firstName || student.nickname }}</strong> die
        Stelle angesehen und ebenfalls interessiert ist, schicken wir Ihnen eine E-Mail mit weiteren
        Infos.
      </template>
    </p>

    <template #footer>
      <MatchdButton
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
        @click="emit('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton :loading="loading" class="block w-full md:w-auto" @click="emit('clickConfirm')">
        <template v-if="matchType === matchTypeEnum.HalfMatch">Match bestätigen</template>
        <template v-else>Matching starten</template>
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import { type MeQuery } from "@/api/queries/me.generated";
import { type StudentStudentFragment } from "@/api/queries/studentFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { computed } from "vue";

withDefaults(
  defineProps<{
    user: MeQuery["me"];
    student: StudentStudentFragment;
    loading?: boolean;
    matchType: MatchTypeEnum;
  }>(),
  {
    loading: false,
  }
);

const emit = defineEmits<{
  (event: "clickConfirm"): void;
  (event: "clickCancel"): void;
}>();
const matchTypeEnum = computed(() => MatchTypeEnum);
</script>
