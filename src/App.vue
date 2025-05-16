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
	background-color: #f4f6fb;
	font-family: 'Segoe UI', Arial, sans-serif;
	margin: 0;
	padding: 0;
}

.container {
	max-width: 900px;
	margin: 0 auto;
	padding: 0;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 4px 24px rgba(60, 72, 88, 0.12);
}

button {
	background: linear-gradient(90deg, #7c3aed 0%, #6366f1 100%);
	color: #fff;
	border: none;
	padding: 6px 14px;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 600;
}

button:hover {
	background: linear-gradient(90deg, #6366f1 0%, #7c3aed 100%);
}

.vue3-easy-data-table,
.vue3-easy-data-table__main {
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
	.container {
		border-radius: 0;
		box-shadow: none;
	}
}
</style>
