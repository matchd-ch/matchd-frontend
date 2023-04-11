<template>
  <ProfileSection :pink="true" :rows="true" title="Ansprechpersonen">
    <ul v-if="employees.length" class="grid grid-cols-3 gap-4 mb-10">
      <li v-for="employee in employees" :key="employee.id" class="mb-4 text-sm">
        <h6 class="text-lg font-medium transition-colors">
          {{ employee.firstName }}
          {{ employee.lastName }}
        </h6>
        <div v-if="employee.role">{{ employee.role }}</div>
        <div v-if="employee.email">{{ employee.email }}</div>
        <a
          v-if="(user?.employee && user.employee?.id) != employee.id"
          class="block underline hover:text-pink-1 font-medium mt-2 transition-colors cursor-pointer"
          @click="selectedEmployee = employee"
        >
          entfernen
        </a>
      </li>
    </ul>
    <MatchdButton variant="outline" class="mb-3" @click="showFormModal = true">
      Ansprechperson hinzufügen
    </MatchdButton>
    <MatchingModal v-if="showFormModal">
      <AddEmployeeForm
        class="mt-10 add-employee-form"
        @click-close="showFormModal = false"
        @submit-complete="showFormModal = false"
      />
    </MatchingModal>
    <MatchingModal v-if="selectedEmployee">
      <h6 class="text-lg font-medium text-center mb-4">
        Soll die Ansprechperson
        <span class="text-pink-1">
          {{ selectedEmployee.firstName }}
          {{ selectedEmployee.lastName }}
        </span>
        wirklich gelöscht werden?
      </h6>
      <template #footer>
        <div class="grid grid-cols-2 gap-4 w-full">
          <MatchdButton
            class="block w-full"
            :loading="deleteEmployeeLoading"
            :disabled="deleteEmployeeLoading"
            @click="selectedEmployee && deleteEmployee(selectedEmployee.id)"
          >
            Ja
          </MatchdButton>
          <MatchdButton class="block w-full" variant="outline" @click="selectedEmployee = null">
            Nein
          </MatchdButton>
        </div>
      </template>
    </MatchingModal>
  </ProfileSection>
</template>

<script setup lang="ts">
import type { Employee } from "@/api/models/types";
import MatchingModal from "@/components/MatchingModal.vue";
import ProfileSection from "@/components/ProfileSection.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/jobposting/action-types";
import { computed, onMounted, ref } from "vue";
import MatchdButton from "../components/MatchdButton.vue";
import AddEmployeeForm from "../containers/AddEmployeeForm.vue";

const store = useStore();

const showFormModal = ref(false);
const selectedEmployee = ref<Employee | null>(null);
const deleteEmployeeState = computed(() => store.getters["deleteEmployeeState"]);
const deleteEmployeeLoading = computed(() => store.getters["deleteEmployeeLoading"]);

const employees = computed(() => store.getters["employees"]);
const user = computed(() => store.getters["user"]);

const emits = defineEmits<{
  (event: "deletionSuccess", id: Employee["id"]): void;
}>();

const deleteEmployee = async (id: Employee["id"]) => {
  await store.dispatch(ActionTypes.DELETE_EMPLOYEE, { id: id });
  if (!deleteEmployeeState.value.success) {
    console.warn("WARNING:", "Something went wrong...");
    return;
  }
  store.dispatch(ActionTypes.EMPLOYEES);
  selectedEmployee.value = null;
  emits("deletionSuccess", id);
};

onMounted(async () => {
  await store.dispatch(ActionTypes.EMPLOYEES);
});
</script>
