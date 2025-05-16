import { defineStore } from 'pinia';
import EmployeeUtils from '../utils/EmployeeUtils';
import type Employee from '../class/Employee';

export const useEmployeeStore = defineStore('employee', {
	state: () => {
		return {
			isLoading: true,
			employees: [] as Employee[],
		};
	},
	getters: {
		employeeRows: (state) => {
			return state.employees.map((employee, id) => {
				return {
					id: id,
					name: `${employee.firstName} ${employee.lastName}`,
					occupation: employee.occupation,
					dateOfEmployment: employee.dateOfEmployment,
					dateOfTermination: employee.dateOfTermination,
				};
			});
		},
	},
	actions: {
		fetchEmployees() {
			// @TODO: fetch employees from actual API
			// for now, we will just generate random employees

			const amount = Math.floor(Math.random() * 25) + 75;

			return new Promise((resolve) => {
				setTimeout(() => {
					const employees = EmployeeUtils.generateRandomEmployees(amount);

					this.$patch({
						isLoading: false,
						employees: employees,
					});
					resolve(employees);
				}, 1000);
			});
		},
		addEmployee(employee: Employee) {
			this.employees.push(employee);
		},
		removeEmployee(index: number) {
			this.employees.splice(index, 1);
		},
		updateEmployee(index: number, employee: Employee) {
			this.employees[index] = employee;
		},
	},
});
