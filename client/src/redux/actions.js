// param actions
export const SET_PARAM = "SET_PARAM";

export const SET_DATE_MIN = "SET_DATE_MIN";

export const SET_DATE_MAX = "SET_DATE_MAX";

export const SET_RESULTS = "SET_RESULTS";

// params action creators
export const setParam = param => ({
  type: SET_PARAM,
  payload: param
});

// dateMin action creators
export const setDateMin = dateMin => ({
  type: SET_DATE_MIN,
  payload: dateMin
});


// dateMax action creators
export const setDateMax = dateMax => ({
  type: SET_DATE_MAX,
  payload: dateMax
});

// results action creators
export const setResults = results => ({
  type: SET_RESULTS,
  payload: results
});
