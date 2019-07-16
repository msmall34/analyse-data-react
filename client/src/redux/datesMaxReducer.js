import * as actions from "./actions";

const initialState = {
  dateMax: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DATE_MAX: {
      return { ...state, dateMax: action.payload };
    }
    default:
      return { ...state };
  }
};
