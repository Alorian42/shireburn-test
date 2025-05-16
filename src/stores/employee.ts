import { defineStore } from 'pinia';
import type Employee from '../class/Employee';
import EmployeeUtils from '../utils/EmployeeUtils';

export const useEmployeeStore = defineStore('employee', {
	state: () => {
		return {
			employees: [] as Employee[],
		};
	},
	actions: {
		fetchEmployees() {
			// @TODO: fetch employees from actual API
			// for now, we will just generate random employees

			const amount = Math.floor(Math.random() * 25) + 75;

			return new Promise((resolve) => {
				setTimeout(() => {
					this.employees = EmployeeUtils.generateRandomEmployees(amount);
					resolve(this.employees);
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
