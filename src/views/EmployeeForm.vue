<template>Hello World2!</template>

<script setup lang="ts">
// id is passed from the router
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee';
import { ref } from 'vue';
import Employee from '../class/Employee';

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const employeeId = route.params.id as string;
const employee = ref<Employee | null>(null);

// For cases of create employee
if (employeeId === undefined) {
	employee.value = new Employee();
} else {
	// For cases of edit and view employee
	employee.value = employeeStore.getEmployee(parseInt(employeeId));

	if (!employee.value) {
		alert('Employee not found');

		router.push({ path: '/' });
	}
}

console.log('Employee ID:', employeeId);
</script>

<style scoped></style>
