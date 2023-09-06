import { getToken } from "./localStorageHelper";

export const getAxiosConfig = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
