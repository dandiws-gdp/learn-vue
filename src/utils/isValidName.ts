export const isValidName = (value: string): boolean => {
  return /^[a-zA-Z\s]*$/.test(value);
};
