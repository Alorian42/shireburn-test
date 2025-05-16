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
			const csvContent =
				'data:text/csv;charset=utf-8,' +
				this.employees
					.map((employee) => {
						return `${employee.firstName},${employee.lastName},${employee.occupation},${employee.dateOfEmployment.toISOString()},${employee.dateOfTermination?.toISOString() ?? ''}`;
					})
					.join('\n');

			const encodedUri = encodeURI(csvContent);
			const link = document.createElement('a');
			link.setAttribute('href', encodedUri);
			link.setAttribute('download', 'employees.csv');
			document.body.appendChild(link);

			link.click();
			document.body.removeChild(link);
		},
		importEmployees(file: File) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const csvData = event.target?.result as string;
				const rows = csvData.split('\n');
				const employees: Employee[] = [];

				rows.forEach((row) => {
					const columns = row.split(',');
					if (columns.length === 5) {
						const employee = new Employee(
							columns[0],
							columns[1],
							columns[2],
							new Date(columns[3]),
							columns[4] ? new Date(columns[4]) : null,
						);
						employees.push(employee);
					}
				});

				this.$patch({
					isLoading: false,
					employees: employees,
				});
			};

			this.$patch({
				isLoading: true,
			});
			reader.readAsText(file);
		},
	},
});
