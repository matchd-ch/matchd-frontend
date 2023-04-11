<template>
  <MatchingModal>
    <div class="text-display-xl text-center mb-6"><TadaIcon /></div>
    <h2 class="text-heading-sm mb-3">Great! Es hat gematchd!</h2>
    <p class="mb-3">
      Ihr passt so gut zusammen, dass ihr euch bald treffen solltet.
      <strong>{{ student.firstName }}</strong>
      erreichen sie per ...
    </p>
    <h3 class="text-heading-xs mb-1">E-Mail:</h3>
    <a
      v-if="student.email"
      :href="`mailto:${student.email}`"
      target="_blank"
      class="inline-block text-lg mb-3 underline"
      >{{ student.email }}</a
    >
    <h3 class="text-heading-xs mb-1">Telefon:</h3>
    <a
      v-if="student.mobile"
      :href="`tel:${student.mobile}`"
      target="_blank"
      class="inline-block text-lg underline"
      >{{ student.mobile }}</a
    >
    <template #footer>
      <MatchdButton class="block w-full md:w-auto mb-3 md:mr-3 md:mb-0" @click="emit('clickClose')">
        Schliessen
      </MatchdButton>
    </template>
  </MatchingModal>
</template>

<script setup lang="ts">
import { type StudentStudentFragment } from "@/api/queries/studentFragment.generated";
import MatchdButton from "@/components/MatchdButton.vue";
import MatchingModal from "@/components/MatchingModal.vue";
import TadaIcon from "@/components/TadaIcon.vue";

defineProps<{
  student: StudentStudentFragment;
}>();

const emit = defineEmits<{
  (event: "clickClose"): void;
}>();
</script>
