// const BASE_URL = "http://localhost:5000/api/getList";

const createError = message => ({ error: true, message });

// export const filterParams = async (param, dateMin, dateMax) => {
//   try {
//     return fetch(`${BASE_URL}`)
//       .then((data) => {
//         // Here you get the data to modify as you please
//         console.log(data)
//       })
//       .catch(function(error) {
//         // If there is any error you will catch them here
//         console.log(error)
//       });
//   } catch (e) {
//     return createError(e.message);
//   }
// };

// export const getParams = async (param) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}`
//     );
//     return await response.json();
//   } catch (e) {
//     return createError(e.message);
//   }
// };

// export const getDatesMin = async (dateMin) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}`
//     );
//     return await response.json();
//   } catch (e) {
//     return createError(e.message);
//   }
// };

// export const getDatesMax = async (dateMax) => {
//   try {
//     const response = await fetch(
//       `${BASE_URL}`
//     );
//     return await response.json();
//   } catch (e) {
//     return createError(e.message);
//   }
// };

// let elementsInvalides = 0;

function checkParam(results, inputs) {

    return results.filter(el => {
      // el.toLowerCase().indexOf(requete.toLowerCase()) !== -1

      const dateMinSelected = inputs ? inputs[0] : ''; // "16-03 10:08:28"
      const dateMinSelectedParts = dateMinSelected ? dateMinSelected.split(' ') : '';
      const dateMinHours = dateMinSelectedParts ? dateMinSelectedParts[1] : ''; // "10:08:28"
      const dateMinHoursParts = dateMinHours ? dateMinHours.split(':') : '';
      const minutesInDateMin = dateMinHoursParts ? Number(dateMinHoursParts[1]) : '';
      // const dateMinNumb = strToDate(inputs[0]).getHours();


      const date = el ? el.time : ''; // "16-03 10:08:28"
      const dateParts = date ? date.split(' ') : '';
      const dateHours = dateParts ? dateParts[1] : ''; // "10:08:28"
      const dateHoursParts = dateHours ? dateHours.split(':') : '';
      const minutesIndate = dateHoursParts ? Number(dateHoursParts[1]) : '';
      //const date = strToDate(el.time).getHours();


      const dateMaxSelected = inputs ? inputs[1] : '' ; // "16-03 10:08:28"
      const dateMaxSelectedParts = dateMaxSelected ? dateMaxSelected.split(' ') : '';
      const dateMaxHours = dateMaxSelectedParts ? dateMaxSelectedParts[1] : ''; // "10:08:28"
      const dateMaxHoursParts = dateMaxHours ? dateMaxHours.split(':') : '';
      const minutesInDateMax = dateMaxHoursParts ? Number(dateMaxHoursParts[1]) : '';
      //const dateMaxNumb = strToDate(inputs[1]).getHours();

      if ((minutesInDateMin <= minutesIndate) && (minutesIndate <= minutesInDateMax)) {
        return el;
      } else {
        // elementsInvalides ++;
        // console.log('elementsInvalides', elementsInvalides);
        return false;
      }

    });

}

// export const getResults = async (dateMin, dateMax)  => {
// fetch(`${BASE_URL}`)
//   .then(res => res.json())
//   .then(results => {
//     const inputs = [dateMin, dateMax]
//     const filteredResults = results.filter(checkParam(inputs));
//     console.log('result', filteredResults);
//     return filteredResults;
//   })
//   .catch((err) => {createError(err.message)});
// };

export const getResults = async (dateMin, dateMax)  => {
fetch("http://localhost:5000/api/getList")
  .then(res => res.json())
  .then(
    (results) => {
      const inputs = [dateMin, dateMax];
      const filteredResults = checkParam(results, inputs);
      console.log('getResults in model', filteredResults);
      return filteredResults;
      // this.setState({
      //   results: filteredResults
      // });
    },
    (error) => {
      console.log('error on getResults');
      createError(error.message);
    }
  )
};