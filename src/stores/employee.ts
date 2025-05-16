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
					name: `${employee.firstName} ${employee.lastName}`,
					occupation: employee.occupation,
					dateOfEmployment:
						employee.dateOfEmployment > now
							? 'Employed soon'
							: 'Currently employed',
					dateOfTermination:
						employee.dateOfTermination === null
							? ''
							: employee.dateOfTermination > now
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
		exportEmployees() {
			const jsonContent = JSON.stringify(
				this.employees.map((employee) => ({
					firstName: employee.firstName,
					lastName: employee.lastName,
					occupation: employee.occupation,
					dateOfEmployment: employee.dateOfEmployment.toISOString(),
					dateOfTermination: employee.dateOfTermination
						? employee.dateOfTermination.toISOString()
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
		importEmployees(file: File) {
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const jsonData = event.target?.result as string;
					const data = JSON.parse(jsonData);
					const employees: Employee[] = data.map(
						(item: any) =>
							new Employee(
								item.firstName,
								item.lastName,
								item.occupation,
								new Date(item.dateOfEmployment),
								item.dateOfTermination
									? new Date(item.dateOfTermination)
									: null,
							),
					);

					this.$patch({
						isLoading: false,
						employees: employees,
					});
				} catch (error) {
					console.error('Invalid JSON file:', error);
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
