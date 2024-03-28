const processSetValue = (value: any) => {
  let result = value;
  try {
    result = JSON.stringify(value);
  } catch (err) {
    result = value;
  }

  return btoa(result);
};

const processGetValue = (value: any) => {
  let result;

  try {
    const decodedValue = atob(value);
    try {
      result = JSON.parse(decodedValue);
    } catch (err) {
      result = decodedValue;
    }
  } catch (err) {
    result = value;
  }

  return result;
};

export const setToSessionStorage = (key: string, value: unknown) => {
  sessionStorage.setItem(key, processSetValue(value));
};

export const getFromSessionStorage = (key: string) =>
  processGetValue(sessionStorage.getItem(key));

export const setToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, processSetValue(value));
};

export const getFromLocalStorage = (key: string) =>
  processGetValue(localStorage.getItem(key));
