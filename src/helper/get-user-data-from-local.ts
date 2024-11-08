export const getUserDataFromLocalstorage = (key: string) => {
  return (
    localStorage.trpos__user_info &&
    JSON.parse(localStorage.trpos__user_info)[key]
  );
};
