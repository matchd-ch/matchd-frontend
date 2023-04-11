import type { AccountType } from "@/models/AccountType";
import { Routes } from "@/router";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface AccountTypeMap {
  [key: string]: AccountType;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useRegistration() {
  const attached = ref(false);
  const passwordFieldType = ref("password");
  const router = useRouter();

  function onScroll() {
    if (!window?.top?.scrollY) return;
    attached.value = window.top.scrollY > 100;
  }

  function onClickNo() {
    router.push({ name: Routes.TRIAGE, hash: "#nichts-passendes-gefunden" });
  }

  function onTogglePasswordVisibility() {
    passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
  }

  function scrollToStep(path: string, stepNumber: number) {
    router.replace({ path, hash: `#step-${stepNumber}` });
  }

  function mounted(className: string) {
    onScroll(); // trigger on mount to assure proper title position
    window.addEventListener("scroll", onScroll);
    document.getElementById("app")?.classList.add(className);
  }

  function beforeUnmount(className: string) {
    window.removeEventListener("scroll", onScroll);
    document.getElementById("app")?.classList.remove(className);
  }

  function urlToAccountTypeMapper(path: string): AccountType {
    const map: AccountTypeMap = {
      "schueler*in-lernender": "student",
      "student*in": "college-student",
      "berufseinsteiger*in": "junior",
      unternehmung: "company",
      bildungsinstitution: "university",
    };
    const splitPath = path.split("/");
    return map[splitPath.slice(-1)[0]] as AccountType;
  }

  return {
    attached,
    passwordFieldType,
    mounted,
    beforeUnmount,
    urlToAccountTypeMapper,
    scrollToStep,
    onClickNo,
    onTogglePasswordVisibility,
  };
}
