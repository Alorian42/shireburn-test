<template>
	<Header />
	<div class="container">
		<router-view />
	</div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import { useEmployeeStore } from './stores/employee';

const employeeStore = useEmployeeStore();

employeeStore.fetchEmployees();
</script>

<style>
body {
	background-color: #b8b8b8;
}

button {
	background-color: #7c3aed;
	color: white;
	border: none;
	padding: 10px;
	border-radius: 5px;
	cursor: pointer;
}
</style>
