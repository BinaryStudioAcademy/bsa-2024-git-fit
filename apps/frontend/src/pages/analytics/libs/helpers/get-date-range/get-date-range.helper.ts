import { formatDate } from "~/libs/helpers/helpers.js";

const DAYS_TO_ADVANCE = 1;

const getDateRange = (startDay: Date, endDay: Date): string[] => {
	const dates: Date[] = [];
	const currentDate = new Date(startDay);

	while (currentDate <= endDay) {
		dates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + DAYS_TO_ADVANCE);
	}

	const formattedDates: string[] = dates.map((date) =>
		formatDate(new Date(date), "MMM d"),
	);

	return formattedDates;
};

export { getDateRange };
