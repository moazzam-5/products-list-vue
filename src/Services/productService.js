import axios from "../Plugins/axios";
import { handleHttpError } from "./httpHelpers";

export const getAllProducts = () => {
  return axios
    .get("/products")
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw handleHttpError(e);
    });
};
