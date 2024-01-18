<template>
  <LoadingBox class="loading-box" :is-loading="loadingState.isLoading.value">
    <div>
      <template v-if="user">
        <StudentDashboard
          v-if="isStudent && studentDashboard"
          :dashboard="studentDashboard"
          class="min-h-content-with-fixed-bars"
        />
        <CompanyDashboard
          v-else-if="companyDashboard"
          :dashboard="companyDashboard"
          class="min-h-content-with-fixed-bars"
        />
      </template>
    </div>
  </LoadingBox>
</template>

<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import LoadingBox from "@/components/LoadingBox.vue";
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import useLoadingState from "@/composables/useLoadingState";
import { calculateMargins } from "@/helpers/calculateMargins";
import { useStore } from "@/store";
import { ActionTypes as ContentActions } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { computed, onMounted, watchEffect } from "vue";
import { setup } from "vue-class-component";
import { useMeta } from "vue-meta";

setup(() =>
  useMeta({
    title: "Dashboard",
  })
);

const store = useStore();

const studentDashboard = computed(() => store.getters["dashboard"]);
const companyDashboard = computed(() => store.getters["companyDashboard"]);
const isStudent = computed(() => store.getters["isStudent"]);
const user = computed(() => store.getters["user"]);

const loadingState = useLoadingState<{ user: boolean; dashboard: boolean }>({
  user: !!user.value,
  dashboard: true,
});

watchEffect(() => {
  if (isStudent.value) {
    loadingState.set("dashboard", !!!studentDashboard.value);
  } else {
    loadingState.set("dashboard", !!!companyDashboard.value);
  }
  loadingState.set("user", !!!user.value);
});

onMounted(async () => {
  await Promise.all([
    store.dispatch(ContentActions.DASHBOARD),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: isStudent.value ? AttachmentKey.StudentAvatar : AttachmentKey.CompanyAvatar,
    }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: isStudent.value
        ? AttachmentKey.StudentAvatarFallback
        : AttachmentKey.CompanyAvatarFallback,
    }),
    store.dispatch(UploadActionTypes.UPLOADED_FILES, {
      key: AttachmentKey.CompanyDocuments,
    }),
  ]);
  calculateMargins();
});
</script>

<style lang="postcss" scoped>
.loading-box {
  height: 100%;
}
</style>
