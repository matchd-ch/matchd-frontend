<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">Hallo {{ user?.firstName }}</h2>
    <p class="mb-3 px-8">
      <template v-if="matchType === MatchTypeEnum.HalfMatch"
        >Nach dem Klick auf "Bestätigen" informieren wir
        <strong>{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</strong>
        von <strong>{{ jobPosting.company.name }}</strong
        >, dass du ebenfalls an dieser Stelle interessiert bist.</template
      >
      <template v-else>
        Cool! Das ist der erste Schritt zum gegenseitigen Matching. Nach dem Klick auf "Freigeben",
        bekommt
        <strong>{{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }}</strong>
        von <strong>{{ jobPosting.company.name }}</strong> den Link zu deinem Profil.<br />Sobald
        {{ jobPosting.employee?.firstName }} {{ jobPosting.employee?.lastName }} dein Profil
        angesehen und es ebenfalls interessant findet, schicken wir dir eine E-Mail mit weiteren
        Infos.
      </template>
    </p>
    <p class="mb-3 px-8">
      Wenn du damit einverstanden bist, werden wir diese Daten von dir bekannt geben:
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
        @click="emit('clickCancel')"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton
        :disabled="!permissionGranted"
        :loading="loading"
        class="block w-full md:w-auto"
        @click="emit('clickConfirm')"
      >
        <template v-if="matchType === MatchTypeEnum.HalfMatch"> Bestätigen </template>
        <template v-else> Freigeben </template>
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import type { JobPostingJobPostingFragment } from "@/api/queries/jobPostingFragment.generated";
import type { MeQuery } from "@/api/queries/me.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import { ref } from "vue";

withDefaults(
  defineProps<{
    user: MeQuery["me"];
    jobPosting: JobPostingJobPostingFragment;
    loading?: boolean;
    matchType: MatchTypeEnum;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  (event: "clickConfirm"): void;
  (event: "clickCancel"): void;
}>();

const permissionGranted = ref(false);
</script>
