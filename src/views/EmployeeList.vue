<template>
	<div>
		<EasyDataTable
			:headers="headers"
			:items="employeeRows"
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
			<button class="export">Export</button>
			<button class="import">Import</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useEmployeeStore } from '../stores/employee';
import EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from 'vue3-easy-data-table';

const employeeStore = useEmployeeStore();
const { isLoading, employeeRows } = storeToRefs(employeeStore);

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

const onDelete = (item: Item) => {
	if (window.confirm('Are you sure you want to delete this employee?')) {
		employeeStore.removeEmployee(item.id);
	}
};
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
