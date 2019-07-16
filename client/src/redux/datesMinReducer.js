import * as actions from "./actions";

const initialState = {
  dateMin: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_DATE_MIN: {
      return { ...state, dateMin: action.payload };
    }
    default:
      return { ...state };
  }
};
