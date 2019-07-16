import { createStore, combineReducers } from "redux";
import { reducer as paramsReducer } from "./paramsReducer";
import { reducer as dateMinReducer } from "./datesMinReducer";
import { reducer as dateMaxReducer } from "./datesMaxReducer";
import { reducer as resultsReducer } from "./resultsReducer";

const rootReducer = combineReducers({
  param: paramsReducer,
  dateMin: dateMinReducer,
  dateMax: dateMaxReducer,
  results: resultsReducer
});

export const store = createStore(rootReducer);
