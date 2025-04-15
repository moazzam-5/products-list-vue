import axios from "../Plugins/axios";
import { handleHttpError } from "./httpHelpers";

export const getAllProducts = (limit, skip) => {
  return axios
    .get(
      `/products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,description,category,discountPercentage,rating,stock,`
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      throw handleHttpError(e);
    });
};
