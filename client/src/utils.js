const getStartDay = (arr) => {
	const dateMin = arr ? arr[0] : ''; // "16-03 10:08:28"
  const dateMinParts = dateMin ? dateMin.split(' ') : '';
  const dateMinDay = dateMinParts ? dateMinParts[0] : ''; //"16-03"
  const dateMinHours = dateMinParts ? dateMinParts[1] : ''; // "10:08:28"

  //work on day
  const dateMinDayParts = dateMinDay ? dateMinDay.split('-') : '';
  const dayInDateMin = dateMinDayParts ? Number(dateMinDayParts[0]) : ''; //16
  const monthInDateMin = dateMinDayParts ? Number(dateMinDayParts[1]) : ''; //08

  //work on hours
  const dateMinHoursParts = dateMinHours ? dateMinHours.split(':') : '';
  const hoursInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[0]) : ''; //10
  const minutesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[1]) : ''; //08
  const secondesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[2]) : '';//28

  return new Date(2018, monthInDateMin, dayInDateMin, hoursInDateMin, minutesInDateMin, secondesInDateMin); // "10:08:28"
}

const getEndDay = (arr) => {
	const dateMaxSelected = arr ? arr[1] : '' ; // "16-03 10:08:28"
  const dateMaxSelectedParts = dateMaxSelected ? dateMaxSelected.split(' ') : '';
  const dateMaxDate = dateMaxSelectedParts ? dateMaxSelectedParts[0] : ''; // "16-03"
  const dateMaxHours = dateMaxSelectedParts ? dateMaxSelectedParts[1] : ''; // "10:08:28"

  //work on current date
  const dateMaxDateParts = dateMaxDate ? dateMaxDate.split('-') : '';
  const dayInDateMax = dateMaxDateParts ? Number(dateMaxDateParts[0]) : ''; //16
  const monthInDateMax = dateMaxDateParts ? Number(dateMaxDateParts[1]) : ''; //08

  //work on dateMax hours
  const dateMaxHoursParts = dateMaxHours ? dateMaxHours.split(':') : '';
  const hoursInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[0]) : '';
  const minutesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[1]) : '';
  const secondesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[2]) : '';

  return new Date(2018, monthInDateMax, dayInDateMax, hoursInDateMax, minutesInDateMax, secondesInDateMax); // "10:08:28"
}

const getCurrentDay = (element) => {
	const current = element ? element.time : ''; // "16-03 10:08:28"
  const currentParts = current ? current.split(' ') : '';
  const currentDate = currentParts ? currentParts[0] : ''; // "16-03"
  const currentHours = currentParts ? currentParts[1] : ''; // "10:08:28"

  //work on current date
  const currentDateParts = currentDate ? currentDate.split('-') : '';
  const dayInCurrent = currentDateParts ? Number(currentDateParts[0]) : ''; //16
  const monthInCurrent = currentDateParts ? Number(currentDateParts[1]) : ''; //08

  //work on current hours
  const currentHoursParts = currentHours ? currentHours.split(':') : '';
  const hoursIncurrent = currentHoursParts ? Number(currentHoursParts[0]) : '';
  const minutesIncurrent = currentHoursParts ? Number(currentHoursParts[1]) : '';
  const secondesIncurrent = currentHoursParts ? Number(currentHoursParts[2]) : '';

  return new Date(2018, monthInCurrent, dayInCurrent, hoursIncurrent, minutesIncurrent, secondesIncurrent); // "10:08:28"
}

export const compareDates = (arr, dateMin) => {
	return arr.filter(el => {
    const dateMinSelected = dateMin ? dateMin : ''; // "16-03 10:08:28"
    const dateMinSelectedParts = dateMinSelected ? dateMinSelected.split(' ') : '';
    const dateMinHours = dateMinSelectedParts ? dateMinSelectedParts[1] : ''; // "10:08:28"
    const dateMinHoursParts = dateMinHours ? dateMinHours.split(':') : '';
    const hoursInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[0]) : '';
    const minutesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[1]) : '';

    const date = el ? el.time : ''; // "16-03 10:08:28"
    const dateParts = date ? date.split(' ') : '';
    const dateHours = dateParts ? dateParts[1] : ''; // "10:08:28"
    const dateHoursParts = dateHours ? dateHours.split(':') : '';
    const hoursIndate = dateHoursParts ? Number(dateHoursParts[0]) : '';
    const minutesIndate = dateHoursParts ? Number(dateHoursParts[1]) : '';

    if ((hoursIndate >= hoursInDateMin) && (minutesIndate > minutesInDateMin)) {
      return el;
    } else {
      return false;
    }
  });
}

export const filterResults = (results, inputs) => {
	return results.filter(el => {
	  while((getStartDay(inputs) <= getCurrentDay(el)) && (getCurrentDay(el) <= getEndDay(inputs))){
	  	return el;
		}
	});
}
