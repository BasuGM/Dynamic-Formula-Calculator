// Library Imports
import { combineReducers, createStore } from "redux";

// Local Imports
import applicationReducer from "./Reducer";

const appReducer = combineReducers({
  appState: applicationReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

// Create Store
const store = createStore(rootReducer);

// Store Export
export default store;
