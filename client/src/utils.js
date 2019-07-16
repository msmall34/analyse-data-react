
// export const strToDate = dateString => {
//     let reggie = /(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/,
// 	[,day, month, hours, minutes, seconds] = reggie.exec(dateString),
// 	dateObject = new Date(day, month, hours, minutes, seconds);
//   return dateObject;
// }

export const compareDates = (arr, dateMin) => {
	const filtertered = arr.filter((el) => {
		const dateMinSelected = dateMin; // "16-03 10:08:28"
		const dateMinSelectedParts = dateMinSelected.split(' ');

		// const dateMinDay = dateMinSelectedParts[0]; // "16-03"
		const dateMinHours = dateMinSelectedParts[1]; // "10:08:28"

		const dateMinHoursParts = dateMinHours.split(':');
		const minutesInDateMin = Number(dateMinHoursParts[1]);


		
		const currentDate = el.time; // "16-03 10:08:28"
		const currentDateParts = currentDate.split(' ');

		// const currentDateDay = currentDateParts[0]; // "16-03"
		const currentDateHours = currentDateParts[1]; // "10:08:28"

		const currentDateHoursParts = currentDateHours.split(':');
		const minutesInCurrentDate = Number(currentDateHoursParts[1]);

		if (minutesInCurrentDate > minutesInDateMin) {
			return true;
		} else {
			return false;
		}
	}) 
	return filtertered;
}

// dateMinNum