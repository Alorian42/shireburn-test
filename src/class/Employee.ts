/**
 * Class respresenting an employee
 */
export default class Employee {
	constructor(
		public fullName: string = '',
		public occupation: string = '',
		public department: string = '',
		public dateOfEmployment: Date = new Date(),
		public terminationDate: Date | null = null,
	) {}
}
