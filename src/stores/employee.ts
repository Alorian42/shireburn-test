import { defineStore } from 'pinia';
import EmployeeUtils from '../utils/EmployeeUtils';
import Employee from '../class/Employee';

export const useEmployeeStore = defineStore('employee', {
	state: () => {
		return {
			isLoading: true,
			employees: [] as Employee[],
		};
	},
	getters: {
		employeeRows: (state) => {
			const now = new Date();

			return state.employees.map((employee, id) => {
				return {
					id: id,
					fullName: employee.fullName,
					occupation: employee.occupation,
					department: employee.department,
					dateOfEmployment:
						employee.dateOfEmployment > now
							? 'Employed soon'
							: 'Currently employed',
					terminationDate:
						employee.terminationDate === null
							? ''
							: employee.terminationDate > now
								? 'To be terminated'
								: 'Terminated',
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
		getEmployee(index: number) {
			return this.employees[index];
		},
		/**
		 * Exports the employees to a JSON file
		 */
		exportEmployees() {
			const jsonContent = JSON.stringify(
				this.employees.map((employee) => ({
					fullName: employee.fullName,
					occupation: employee.occupation,
					department: employee.department,
					dateOfEmployment: employee.dateOfEmployment
						.toISOString()
						.substring(0, 10),
					terminationDate: employee.terminationDate
						? employee.terminationDate.toISOString().substring(0, 10)
						: null,
				})),
				null,
				2,
			);

			const blob = new Blob([jsonContent], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.setAttribute('href', url);
			link.setAttribute('download', 'employees.json');
			document.body.appendChild(link);

			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		},
		/**
		 * Imports employees from a JSON file
		 * Validates the JSON format and the date formats
		 */
		importEmployees(file: File) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const jsonData = event.target?.result as string;
					const data = JSON.parse(jsonData);

					const employees: Employee[] = data.map((item: any) => {
						const keys = Object.keys(item);
						const keysAreValid = keys.every((key) =>
							[
								'fullName',
								'occupation',
								'department',
								'dateOfEmployment',
								'terminationDate',
							].includes(key),
						);
						const dateOfEmployment = new Date(item.dateOfEmployment);
						const dateOfEmploymentIsValid = !isNaN(dateOfEmployment.getTime());
						const terminationDate = item.terminationDate
							? new Date(item.terminationDate)
							: null;
						const terminationDateIsValid =
							(terminationDate !== null && !isNaN(terminationDate.getTime())) ||
							terminationDate === null;
						if (keys.length !== 5 || !keysAreValid) {
							throw new Error('Invalid JSON format');
						} else if (!dateOfEmploymentIsValid) {
							throw new Error('Invalid dateOfEmployment format');
						} else if (!terminationDateIsValid) {
							throw new Error('Invalid terminationDate format');
						}

						return new Employee(
							item.fullName,
							item.occupation,
							item.department,
							dateOfEmployment,
							terminationDate,
						);
					});

					this.$patch({
						isLoading: false,
						employees: employees,
					});
				} catch (error) {
					console.error(error);
					alert(error);
					this.$patch({ isLoading: false });
				}
			};

			this.$patch({
				isLoading: true,
			});
			reader.readAsText(file);
		},
	},
});
