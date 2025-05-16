import Employee from '../class/Employee';

const POSSIBLE_EMPLOYEE_FIRST_NAMES = [
	'Alice',
	'Bob',
	'Charlie',
	'David',
	'Eve',
	'Frank',
	'Grace',
	'Hannah',
	'Ivy',
	'Jack',
	'Kathy',
	'Leo',
	'Mia',
];
const POSSIBLE_EMPLOYEE_LAST_NAMES = [
	'Anderson',
	'Brown',
	'Clark',
	'Davis',
	'Evans',
	'Garcia',
	'Harris',
	'Johnson',
	'King',
	'Lee',
	'Miller',
	'Nguyen',
];
const POSSIBLE_EMPLOYEE_OCCUPATIONS = [
	'Software Engineer',
	'Data Scientist',
	'Product Manager',
	'UX Designer',
	'Marketing Specialist',
	'Sales Associate',
	'Customer Support',
	'HR Manager',
	'Finance Analyst',
	'Operations Manager',
];
const POSSIBLE_EMPLOYEE_DEPARTMENTS = [
	'Engineering',
	'Marketing',
	'Sales',
	'Customer Support',
	'Human Resources',
	'Finance',
	'Operations',
];

/**
 * Utils class for generating random employees
 */
export default class EmployeeUtils {
	private static getRandomElementFromArray<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	public static generateRandomEmployee(): Employee {
		const firstName = this.getRandomElementFromArray(
			POSSIBLE_EMPLOYEE_FIRST_NAMES,
		);
		const lastName = this.getRandomElementFromArray(
			POSSIBLE_EMPLOYEE_LAST_NAMES,
		);
		const occupation = this.getRandomElementFromArray(
			POSSIBLE_EMPLOYEE_OCCUPATIONS,
		);
		const department = this.getRandomElementFromArray(
			POSSIBLE_EMPLOYEE_DEPARTMENTS,
		);
		// either in the past or in the future
		const dateOfEmployment =
			Math.random() > 0.2
				? new Date(Date.now() - Math.random() * 10000000000)
				: new Date(Date.now() + Math.random() * 10000000000);
		// either null, in the past or in the future
		// 80% chance of being null, 10% chance of being in the past, 10% chance of being in the future
		const terminationDate =
			Math.random() < 0.8
				? null
				: Math.random() > 0.5
					? new Date(Date.now() - Math.random() * 10000000000)
					: new Date(Date.now() + Math.random() * 10000000000);

		return new Employee(
			`${firstName} ${lastName}`,
			occupation,
			department,
			dateOfEmployment,
			terminationDate,
		);
	}

	public static generateRandomEmployees(amount: number): Employee[] {
		const employees: Employee[] = [];
		for (let i = 0; i < amount; i++) {
			employees.push(this.generateRandomEmployee());
		}
		return employees;
	}
}
