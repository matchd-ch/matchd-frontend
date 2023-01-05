<template>
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
</template>

<script setup lang="ts">
import { AttachmentKey } from "@/api/models/types";
import CompanyDashboard from "@/components/dashboard/CompanyDashboard.vue";
import StudentDashboard from "@/components/dashboard/StudentDashboard.vue";
import { calculateMargins } from "@/helpers/calculateMargins";
import { useStore } from "@/store";
import { ActionTypes as ContentActions } from "@/store/modules/content/action-types";
import { ActionTypes as UploadActionTypes } from "@/store/modules/upload/action-types";
import { computed, onMounted } from "vue";
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
  ]);
  calculateMargins();
});
</script>

<style></style>
