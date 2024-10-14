import { computed, onBeforeMount, onUnmounted, ref } from "vue";

export default () => {
  const device = ref<"DESKTOP" | "MOBILE">("MOBILE");
  const isDesktop = computed(() => device.value === "DESKTOP");
  const isMobile = computed(() => device.value === "MOBILE");
  function setDevice() {
    if (window.innerWidth < 1024) {
      device.value = "MOBILE";
      return;
    }
    device.value = "DESKTOP";
  }
  onBeforeMount(() => {
    window.addEventListener("resize", setDevice);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", setDevice);
  });

  setDevice();

  return {
    device,
    isDesktop,
    isMobile,
  };
};
