import { useStore } from "@/store";
import { jwtDecode } from "jwt-decode";
import { computed, ref, watch } from "vue";

type ImpersonatorToken = {
  username: string;
  exp: number;
  action: string;
  actor: string;
};

const createImpersonatorStore = () => {
  const store = useStore();
  const timer = ref<null | string>(null);
  const interval = ref<NodeJS.Timeout | number | undefined>(undefined);

  const impersonator = computed(() => {
    if (!store.getters["accessToken"]) {
      return null;
    }
    try {
      const obj = jwtDecode<ImpersonatorToken | undefined>(store.getters["accessToken"]);
      if (!obj || obj.action !== "impersonate") {
        return null;
      }
      return obj;
    } catch {
      return null;
    }
  });

  const resetInterval = () => {
    clearInterval(interval.value);
    timer.value = null;
  };

  const setTime = () => {
    if (!impersonator.value?.exp) {
      resetInterval();
      return;
    }
    const dateExp = new Date(impersonator.value.exp * 1000);
    const dateNow = new Date();
    const difference = dateExp.getTime() - dateNow.getTime();

    if (difference <= 0) {
      resetInterval();
      return;
    }
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    const output = [...(days > 0 ? [days] : []), ...(hours > 0 ? [hours] : []), minutes, seconds];
    timer.value = output.map((num) => (num < 10 ? "0" + num : num)).join(":");
  };

  watch(
    impersonator,
    () => {
      resetInterval();
      if (!impersonator.value) {
        return;
      }
      interval.value = setInterval(setTime, 1000);
    },
    { immediate: true },
  );

  return {
    impersonator,
    timer,
  };
};

const impersonatorStore = createImpersonatorStore();
export default () => impersonatorStore;
