<template>
	<div>
		<div>
			Search in:
			<select v-model="searchField">
				<option>name</option>
				<option>occupation</option>
			</select>
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
					<button>View</button>
					<button>Edit</button>
					<button @click="onDelete(item)">Delete</button>
				</div>
			</template>
		</EasyDataTable>

		<div class="global-actions">
			<button class="create">Create Employee</button>
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

const employeeStore = useEmployeeStore();
const { isLoading, employeeRows } = storeToRefs(employeeStore);

const { open, onChange } = useFileDialog({
	accept: 'application/json',
	multiple: false,
});

const headers: Header[] = [
	{ text: 'Name', value: 'name', sortable: true, width: 100 },
	{ text: 'Occupation', value: 'occupation', sortable: true, width: 100 },
	{
		text: 'Date of Employment',
		value: 'dateOfEmployment',
		sortable: true,
		width: 100,
	},
	{
		text: 'Termination Date',
		value: 'dateOfTermination',
		sortable: true,
		width: 100,
	},
	{ text: 'Actions', value: 'actions', sortable: false, width: 220 },
];

const searchField = ref('name');
const searchValue = ref('');

const onDelete = (item: Item) => {
	if (window.confirm('Are you sure you want to delete this employee?')) {
		employeeStore.removeEmployee(item.id);
	}
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
});
</script>

<style scoped>
.actions {
	display: flex;
	gap: 10px;
	padding: 5px;
}

.global-actions {
	display: flex;
	gap: 10px;
	margin-top: 20px;
}
</style>
