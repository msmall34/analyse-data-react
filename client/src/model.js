const BASE_URL = "http://localhost:5000/api/getList";

const createError = message => ({ error: true, message });


export const filterParams = async (param, dateMin, dateMax) => {
  try {
    return fetch(`${BASE_URL}`)
      .then((data) => {
        // Here you get the data to modify as you please
        console.log(data)
      })
      .catch(function(error) {
        // If there is any error you will catch them here
        console.log(error)
      });
  } catch (e) {
    return createError(e.message);
  }
};

export const getParams = async (param) => {
  try {
    const response = await fetch(
      `${BASE_URL}`
    );
    return await response.json();
  } catch (e) {
    return createError(e.message);
  }
};

export const getDatesMin = async (dateMin) => {
  try {
    const response = await fetch(
      `${BASE_URL}`
    );
    return await response.json();
  } catch (e) {
    return createError(e.message);
  }
};

export const getDatesMax = async (dateMax) => {
  try {
    const response = await fetch(
      `${BASE_URL}`
    );
    return await response.json();
  } catch (e) {
    return createError(e.message);
  }
};

let elementsInvalides = 0;

function checkParam(inputs) {
  return function(obj) {

    const dateMinSelected = inputs[0]; // "16-03 10:08:28"
    const dateMinSelectedParts = dateMinSelected.split(' ');
    const dateMinHours = dateMinSelectedParts[1]; // "10:08:28"
    const dateMinHoursParts = dateMinHours.split(':');
    const minutesInDateMin = Number(dateMinHoursParts[1]);
    // const dateMinNumb = strToDate(inputs[0]).getHours();


    const date = obj.time; // "16-03 10:08:28"
    const dateParts = date.split(' ');
    const dateHours = dateParts[1]; // "10:08:28"
    const dateHoursParts = dateHours.split(':');
    const minutesIndate = Number(dateHoursParts[1]);
    //const date = strToDate(obj.time).getHours();


    const dateMaxSelected = inputs[1]; // "16-03 10:08:28"
    const dateMaxSelectedParts = dateMaxSelected.split(' ');
    const dateMaxHours = dateMaxSelectedParts[1]; // "10:08:28"
    const dateMaxHoursParts = dateMaxHours.split(':');
    const minutesInDateMax = Number(dateMaxHoursParts[1]);
    //const dateMaxNumb = strToDate(inputs[1]).getHours();

    if ((minutesInDateMax >= minutesIndate) && (minutesIndate <= minutesInDateMin)) {
      return true;
    } else {
      elementsInvalides ++;
      console.log('elementsInvalides', elementsInvalides);
      return false;
    }
  }
}

export const getResults = async (dateMin, dateMax)  => {
fetch(`${BASE_URL}`)
  .then(res => res.json())
  .then(results => {
    const inputs = [dateMin, dateMax]
    const filteredResults = results.filter(checkParam(inputs));
    console.log('result', filteredResults);
    return filteredResults;
  })
  .catch((err) => {createError(err.message)});
};