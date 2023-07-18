import { useStore } from "@/store";
import { computed } from "vue";

export default () => {
  const store = useStore();
  const challenge = computed(() => store.getters["challengeDetail"]);

  const isMentoring = computed(() => challenge.value.data?.challengeType.name === "Mentoring");
  const challengeMentoringLabel = computed(() => (isMentoring.value ? "Mentoring" : "Challenge"));

  return { isMentoring, challengeMentoringLabel };
};
