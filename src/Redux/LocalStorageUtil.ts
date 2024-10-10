const getData = (key: string, defaultValue: any) => {
  const value: any = localStorage.getItem(key);
  if (!value) {
    return defaultValue;
  } else {
    return JSON.parse(value);
  }
};

const setData = (key: string, value: any) => {
  console.log("value");
  console.log(JSON.stringify(value, null, 4));
  localStorage.setItem(key, JSON.stringify(value));
};

const KEYS = {
  SAVED_FORMULAS: "SAVED_FORMULAS",
};

const LocalStorageUtil = {
  setData,
  getData,
  KEYS,
};

export default LocalStorageUtil;
