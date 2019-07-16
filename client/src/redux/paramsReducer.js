import * as actions from "./actions";

const initialState = {
  param: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PARAM: {
      return { ...state, param: action.payload };
    }
    default:
      return { ...state };
  }
};
