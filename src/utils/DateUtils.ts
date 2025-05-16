export default class DateUtils {
	/**
	 * Formats a date to a string in the format dd/mm/yyyy
	 */
	public static formatDate(date: Date | null): string {
		if (!date) {
			return 'none';
		}

		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};

		return new Intl.DateTimeFormat('en-GB', options).format(date);
	}
}
