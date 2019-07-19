const createError = message => ({ error: true, message });

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

	  const dateMinSelected = inputs ? inputs[0] : ''; // "16-03 10:08:28"
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

	  const dateMaxSelected = inputs ? inputs[1] : '' ; // "16-03 10:08:28"
	  const dateMaxSelectedParts = dateMaxSelected ? dateMaxSelected.split(' ') : '';
	  const dateMaxHours = dateMaxSelectedParts ? dateMaxSelectedParts[1] : ''; // "10:08:28"
	  const dateMaxHoursParts = dateMaxHours ? dateMaxHours.split(':') : '';
	  const hoursInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[0]) : '';
	  const minutesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[1]) : '';

	  if (((minutesInDateMax >= minutesIndate) && (minutesIndate >= minutesInDateMin))
	    && ((hoursInDateMax >= hoursIndate) && (hoursIndate >= hoursInDateMin))) {
	    return el;
	  } else {
	    return false;
	  }

	});
}


