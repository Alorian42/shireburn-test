/**
 * Class respresenting an employee
 */
export default class Employee {
	constructor(
		public firstName: string,
		public lastName: string,
		public occupation: string,
		public dateOfEmployment: Date,
		public dateOfTermination: Date | null,
	) {}
}
