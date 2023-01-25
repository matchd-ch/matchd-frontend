<template>
  <div>Please wait...</div>
</template>
<script setup lang="ts">
import { Routes } from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/login/action-types";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if (!route.hash) {
    router.replace({ name: Routes.LOGIN });
  } else {
    await store.dispatch(ActionTypes.IMPERSONATE, { token: route.hash.replace("#", "") });
    router.replace({ name: Routes.DASHBOARD });
  }
});
</script>
<style></style>
