import { useStore } from "@/store";
import { MutationTypes } from "@/store/modules/login/mutation-types";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export async function needsStateResetBeforePasswordResetGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const store = useStore();
  // don't reset state when entering from the PasswordReset route to maintain potential errors
  if (from.name !== "PasswordReset") {
    store.commit(MutationTypes.RESET_PASSWORD_RESET_STATE);
  }
  next();
}
