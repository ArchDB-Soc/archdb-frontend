export const buildObjectFromForm = (keys, values) => {

    const object = {};
    for (let i = 0; i < keys.length && i < values.length; i++) {
      const key = keys[i];
      const value = values[i];
      object[key] = value;
    }
    return object
  }

export const capitaliseFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default buildObjectFromForm