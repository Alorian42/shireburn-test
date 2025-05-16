<template>
	<div v-if="employee">
		<template v-if="isViewMode">
			<h2>{{ employee.fullName }}</h2>
			<p>Occupation: {{ employee.occupation }}</p>
			<p>Department: {{ employee.department }}</p>
			<p>Date of Employment: {{ formatDate(employee.dateOfEmployment) }}</p>
			<p>Termination Date: {{ formatDate(employee.terminationDate) }}</p>
		</template>
		<template v-else>
			<h2>{{ isEditMode ? 'Edit Employee' : 'Create Employee' }}</h2>
			<form @submit.prevent="onSubmit">
				<div>
					<label for="fullName">Full Name</label>
					<input type="text" v-model="employee.fullName" required />
				</div>
				<div>
					<label for="occupation">Occupation</label>
					<input type="text" v-model="employee.occupation" required />
				</div>
				<div>
					<label for="department">Department</label>
					<input type="text" v-model="employee.department" required />
				</div>
				<div>
					<label for="dateOfEmployment">Date of Employment</label>
					<input type="date" v-model="employmentDateValue" required />
				</div>
				<div>
					<label for="terminationDate">Termination Date</label>
					<input type="date" v-model="terminationDateValue" />
				</div>
				<button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
			</form>
		</template>
		<button @click="onClose">Close</button>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employee';
import { computed, ref } from 'vue';
import Employee from '../class/Employee';
import DateUtils from '../utils/DateUtils';

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const employeeId = route.params.id as string;
const employee = ref<Employee | null>(null);
const mode = ref<'create' | 'edit' | 'view'>('create');
const isEditMode = computed(() => mode.value === 'edit');
const isViewMode = computed(() => mode.value === 'view');
const isCreateMode = computed(() => mode.value === 'create');

// For cases of create employee
if (employeeId === undefined) {
	employee.value = new Employee();
	mode.value = 'create';
} else {
	// For cases of edit and view employee
	employee.value = employeeStore.getEmployee(parseInt(employeeId));

	if (!employee.value) {
		alert('Employee not found');

		router.push({ path: '/' });
	}

	if (route.name === 'view-employee-form') {
		mode.value = 'view';
	} else if (route.name === 'edit-employee-form') {
		mode.value = 'edit';
	}
}

const onClose = () => {
	router.push({ path: '/' });
};
const onSubmit = () => {
	if (!employee.value) {
		alert('Employee not found');

		onClose();
		return;
	}

	if (isEditMode.value) {
		employeeStore.updateEmployee(parseInt(employeeId), employee.value);
	} else if (isCreateMode.value) {
		employeeStore.addEmployee(employee.value);
	}

	router.push({ path: '/' });
};

// Creates computed wrapper to handle date transformation
const employmentDateValue = computed({
	get() {
		if (employee.value && employee.value.dateOfEmployment) {
			return employee.value.dateOfEmployment.toISOString().substring(0, 10);
		}
		return '';
	},
	set(val: string) {
		if (employee.value && val) {
			employee.value.dateOfEmployment = new Date(val);
		}
	},
});

// Creates computed wrapper to handle date transformation
const terminationDateValue = computed({
	get() {
		if (employee.value && employee.value.terminationDate) {
			return employee.value.terminationDate.toISOString().substring(0, 10);
		}
		return '';
	},
	set(val: string) {
		if (employee.value) {
			if (val === '') {
				employee.value.terminationDate = null;
			} else {
				employee.value.terminationDate = new Date(val);
			}
		}
	},
});

const formatDate = DateUtils.formatDate;
</script>

<style scoped></style>
