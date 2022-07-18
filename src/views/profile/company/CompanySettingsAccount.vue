<template>
  <SettingsAccount
    @submit-complete="emits('submitComplete', $event)"
    @change-dirty="emits('changeDirty', $event)"
    @click-cancel="emits('clickCancel')"
  />
</template>

<script setup lang="ts">
import SettingsAccount from "../SettingsAccount.vue";
const emits = defineEmits<{
  (event: "submitComplete", success: boolean): void;
  (event: "changeDirty", dirty: boolean): void;
  (event: "clickCancel"): void;
}>();
</script>
