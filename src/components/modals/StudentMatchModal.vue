<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3">Hallo {{ user.firstName }} {{ user.lastName }}</h2>
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

    <template v-slot:footer>
      <MatchdButton
        @click="$emit('clickCancel')"
        variant="outline"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton
        @click="$emit('clickConfirm')"
        :loading="loading"
        class="block w-full md:w-auto"
      >
        <template v-if="matchType === matchTypeEnum.HalfMatch">Match bestätigen</template>
        <template v-else>Matching starten</template>
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import type { Student, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  user = prop<User>({});
  student = prop<Student>({});
  loading = prop<boolean>({ default: false });
  matchType = prop<MatchTypeEnum>({});
}

@Options({
  components: {
    MatchdButton,
    MatchingModal,
  },
  emits: ["clickConfirm", "clickCancel"],
})
export default class StudentMatchModal extends Vue.with(Props) {
  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }
}
</script>
