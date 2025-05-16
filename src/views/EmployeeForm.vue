<template>
	<div class="wrapper" v-if="employee">
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
				<div class="form-field">
					<label for="fullName">Full Name</label>
					<input type="text" v-model="employee.fullName" required />
				</div>
				<div class="form-field">
					<label for="occupation">Occupation</label>
					<input type="text" v-model="employee.occupation" required />
				</div>
				<div class="form-field">
					<label for="department">Department</label>
					<input type="text" v-model="employee.department" required />
				</div>
				<div class="form-field">
					<label for="dateOfEmployment">Date of Employment</label>
					<input type="date" v-model="employmentDateValue" required />
				</div>
				<div class="form-field">
					<label for="terminationDate">Termination Date</label>
					<input type="date" v-model="terminationDateValue" />
				</div>
				<button type="submit">{{ isEditMode ? 'Update' : 'Create' }}</button>
			</form>
		</template>
		<button class="close-button" @click="onClose">Close</button>
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

<style scoped>
.wrapper {
	margin: 0 auto;
	background: #fff;
	border-radius: 12px;
	box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
	padding: 32px 28px 24px 28px;
}

h2 {
	margin-top: 0;
	margin-bottom: 18px;
	color: #2d3a4b;
	font-size: 1.7rem;
	font-weight: 600;
}

p {
	margin: 8px 0 0 0;
	color: #4a5568;
	font-size: 1.05rem;
}

.form-field {
	margin-bottom: 18px;
	display: flex;
	flex-direction: column;
}

label {
	margin-bottom: 6px;
	color: #374151;
	font-weight: 500;
	font-size: 1rem;
}

input[type='text'],
input[type='date'] {
	padding: 8px 10px;
	border: 1px solid #cbd5e1;
	border-radius: 6px;
	font-size: 1rem;
	background: #f8fafc;
	transition: border 0.2s;
}

input[type='text']:focus,
input[type='date']:focus {
	border-color: #7c3aed;
	outline: none;
}

button {
	min-width: 100%;
}

.close-button {
	margin-top: 10px;
}

@media (max-width: 600px) {
	.wrapper {
		border-radius: 0;
		box-shadow: none;
	}
}
</style>
