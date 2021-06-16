<template>
  <MatchingModal>
    <h2 class="text-heading-sm mb-3 px-8">Hallo {{ user.firstName }}</h2>
    <p class="mb-3 px-8">
      Cool! Nach dem Klick auf "Freigeben", bekommt
      <strong
        >{{ projectPosting.employee?.firstName }} {{ projectPosting.employee?.lastName }}</strong
      >
      von <strong>{{ projectPosting.company.name }}</strong> eine Meldung, dass du an der
      ausgeschriebenen Projektarbeit interessiert bist.
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
        variant="outline"
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
import type { ProjectPosting, User } from "api";
import { Options, prop, Vue } from "vue-class-component";

class Props {
  user = prop<User>({});
  projectPosting = prop<ProjectPosting>({});
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
export default class ProjectPostingMatchModal extends Vue.with(Props) {
  permissionGranted = false;

  get matchTypeEnum(): typeof MatchTypeEnum {
    return MatchTypeEnum;
  }
}
</script>
