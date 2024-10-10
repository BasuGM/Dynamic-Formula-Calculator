import ActionTypes from "./ActionTypes";
import LocalStorageUtil from "./LocalStorageUtil";

const savedFormulaInit = LocalStorageUtil.getData(
  LocalStorageUtil.KEYS.SAVED_FORMULAS,
  []
);

const initialState = {
  savedFormulas: savedFormulaInit,
};

const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SAVED_FORMULAS:
      LocalStorageUtil.setData(
        LocalStorageUtil.KEYS.SAVED_FORMULAS,
        action.payload
      );
      return {
        ...state,
        savedFormulas: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;
