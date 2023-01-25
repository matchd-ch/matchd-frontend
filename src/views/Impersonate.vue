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

// http://localhost:8080/impersonate/#eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0dWRlbnQtNkBtYXRjaGQubG9jYWxob3N0IiwiZXhwIjoxNjc0NDkxNDEzLCJhY3Rpb24iOiJpbXBlcnNvbmF0ZSIsImFjdG9yIjoiYWRtaW4ifQ.Oxm604iMJxBJJJG2VDe4xybCcDNuH4OhHJCW1911M0E

onMounted(async () => {
  if (!route.hash) {
    router.replace({ name: Routes.LOGIN });
  } else {
    // await store.dispatch(ActionTypes.LOGOUT_CLEAR_STATE);
    await store.dispatch(ActionTypes.IMPERSONATE, { token: route.hash.replace("#", "") });
    router.replace({ name: Routes.DASHBOARD });
  }
});
</script>
<style></style>
