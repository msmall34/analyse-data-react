import * as actions from "./actions";

const initialState = {
  results: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_RESULTS: {
      return { ...state, results: action.payload };
    }
    default:
      return { ...state };
  }
};