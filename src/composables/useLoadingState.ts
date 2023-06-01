import type { Ref } from "vue";
import { computed, ref } from "vue";

export default <T extends Record<string, boolean>>(initialLoadingState: T) => {
  const loadingState = ref(initialLoadingState) as Ref<T>;

  const isLoading = computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(loadingState.value).some((ls) => ls);
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const get = <K extends keyof T>(key: K) => loadingState.value[key];
  const set = <K extends keyof T>(key: K, value: T[K]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    loadingState.value[key] = value;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.debug(`loadingState updated: ${key as string} = ${value}`);
  };

  return {
    isLoading,
    get,
    set,
    loadingState,
  };
};
