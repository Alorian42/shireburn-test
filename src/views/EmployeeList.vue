<template>
	<div class="wrapper">
		<div class="search-bar">
			<div>
				Search in:
				<select v-model="searchField">
					<option>name</option>
					<option>occupation</option>
				</select>
			</div>
			<input type="text" v-model="searchValue" placeholder="Search..." />
		</div>
		<EasyDataTable
			:headers="headers"
			:items="employeeRows"
			:search-field="searchField"
			:search-value="searchValue"
			:loading="isLoading"
		>
			<template #loading> Data is loading... </template>

			<template #item-actions="item">
				<div class="actions">
					<button @click="onView(item)">View</button>
					<button @click="onEdit(item)">Edit</button>
					<button @click="onDelete(item)">Delete</button>
				</div>
			</template>
		</EasyDataTable>

		<div class="global-actions">
			<button class="create" @click="onCreate">Create Employee</button>
			<button class="export" @click="onExport">Export</button>
			<button class="import" @click="onImportClick">Import</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEmployeeStore } from '../stores/employee';
import EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from 'vue3-easy-data-table';
import { ref } from 'vue';
import { useFileDialog } from '@vueuse/core';
import { useRouter } from 'vue-router';

const employeeStore = useEmployeeStore();
const { isLoading, employeeRows } = storeToRefs(employeeStore);

const { open, onChange, reset } = useFileDialog({
	accept: 'application/json',
	multiple: false,
});
const router = useRouter();

const headers: Header[] = [
	{ text: 'Name', value: 'fullName', sortable: true, width: 100 },
	{ text: 'Occupation', value: 'occupation', sortable: true, width: 100 },
	{ text: 'Department', value: 'department', sortable: true, width: 100 },
	{
		text: 'Date of Employment',
		value: 'dateOfEmployment',
		sortable: true,
		width: 100,
	},
	{
		text: 'Termination Date',
		value: 'terminationDate',
		sortable: true,
		width: 100,
	},
	{ text: 'Actions', value: 'actions', sortable: false, width: 220 },
];

const searchField = ref('name');
const searchValue = ref('');

const onDelete = (item: Item) => {
	if (confirm('Are you sure you want to delete this employee?')) {
		employeeStore.removeEmployee(item.id);
	}
};
const onView = (item: Item) => {
	router.push({ name: 'view-employee-form', params: { id: item.id } });
};

const onEdit = (item: Item) => {
	router.push({ name: 'edit-employee-form', params: { id: item.id } });
};

const onCreate = () => {
	router.push({ name: 'create-employee-form' });
};

const onExport = () => {
	employeeStore.exportEmployees();
};
const onImportClick = () => {
	open();
};
onChange((files) => {
	if (files && files.length > 0) {
		employeeStore.importEmployees(files[0]);
	}

	reset();
});
</script>

<style scoped>
.wrapper {
	padding-bottom: 20px;
}

.search-bar {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 18px;
	background: #f8f9fa;
	padding: 16px 20px;
	border-radius: 8px;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.search-bar input {
	width: 200px;
}

.search-bar div {
	display: flex;
	align-items: center;
	gap: 10px;
}

.search-bar input,
.search-bar select {
	padding: 8px 10px;
	border: 1px solid #cbd5e1;
	border-radius: 6px;
	font-size: 1rem;
	background: #f8fafc;
	transition: border 0.2s;
}

.search-bar input:focus,
.search-bar select:focus {
	border-color: #7c3aed;
	outline: none;
}

.actions {
	display: flex;
	gap: 10px;
	padding: 5px;
}

.global-actions {
	display: flex;
	gap: 10px;
	margin-top: 20px;
	padding-left: 20px;
}

@media (max-width: 600px) {
	.global-actions {
		padding-left: 5px;
		padding-right: 5px;
		flex-direction: column;
	}

	.search-bar {
		flex-direction: column;
	}

	.search-bar input,
	.search-bar select,
	.search-bar div {
		width: 100%;
	}
}
</style>
