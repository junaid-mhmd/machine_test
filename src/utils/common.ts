// get age by date
export const getAge = (dob: string | Date): number => {
	const birthDate = typeof dob === "string" ? new Date(dob) : dob;
	const today = new Date();

	let age = today.getFullYear() - birthDate?.getFullYear();

	const monthDiff = today.getMonth() - birthDate.getMonth();
	const dayDiff = today.getDate() - birthDate.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
};

// apply advanced filter to table rows
export const applyFilters = (row: any, filters: any[]) => {
	return filters.every((filter) => {
		const { column, operator, value } = filter;
		const rowValue = row[column];

		if (!rowValue) return true;
		if (!column) return true;
		if (!operator) return true;
		if (!value) return true;

		switch (operator) {
			case "Equals":
				return rowValue == value;
			case "Not equals":
				return rowValue != value;
			case "Contains":
				return rowValue.toLowerCase().includes(value.toLowerCase());
			case "Starts with":
				return rowValue.toLowerCase().startsWith(value.toLowerCase());
			case "Ends with":
				return rowValue.toLowerCase().endsWith(value.toLowerCase());
			case "Greater than":
				return rowValue > value;
			case "Less than":
				return rowValue < value;
			default:
				return true;
		}
	});
};
