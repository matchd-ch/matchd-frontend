<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">Hallo {{ user.firstName }}</h2>
    <p class="mb-3 px-8">
      <template v-if="matchType === matchTypeEnum.HalfMatch"
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
        <template v-slot:label>Deine Kontaktdaten und Zertifikate freigeben</template>
        <input id="permissionGranted" type="checkbox" v-model="permissionGranted" />
        <template v-slot:value>
          <span :class="{ 'text-primary-1': permissionGranted }">Einverstanden</span>
        </template>
      </MatchdToggle>
    </div>

    <template v-slot:footer>
      <MatchdButton
        @click="$emit('clickCancel')"
        class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0"
      >
        Abbrechen
      </MatchdButton>
      <MatchdButton
        @click="$emit('clickConfirm')"
        :disabled="!permissionGranted"
        :loading="loading"
        class="block w-full md:w-auto"
      >
        <template v-if="matchType === matchTypeEnum.HalfMatch"> Bestätigen </template>
        <template v-else> Freigeben </template>
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script lang="ts">
import MatchdButton from "@/components/MatchdButton.vue";
import MatchdToggle from "@/components/MatchdToggle.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import { MatchTypeEnum } from "@/models/MatchTypeEnum";
import type { JobPosting, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  user = prop<User>({});
  jobPosting = prop<JobPosting>({});
  loading = prop<boolean>({ default: false });
  matchType = prop<MatchTypeEnum>({});
}

@Options({
  components: {
    MatchdButton,
    MatchingModal,
    MatchdToggle,
  },
  emits: ["clickConfirm", "clickCancel"],
})
export default class JobPostingMatchModal extends Vue.with(Props) {
  permissionGranted = false;

  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }
}
</script>
