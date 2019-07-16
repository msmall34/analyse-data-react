import { createStore, combineReducers } from "redux";
import { reducer as paramsReducer } from "./paramsReducer";
import { reducer as dateMinReducer } from "./datesMinReducer";
import { reducer as dateMaxReducer } from "./datesMaxReducer";

const rootReducer = combineReducers({
  param: paramsReducer,
  dateMin: dateMinReducer,
  dateMax: dateMaxReducer,
});

export const store = createStore(rootReducer);
