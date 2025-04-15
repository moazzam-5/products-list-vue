export function handleHttpError(e) {
  if (e.response && e.response.data && e.response.data.message)
    return {
      error: e.response.data.message,
      status: e.response.status,
      ...e.response.data,
    };
//   console.log("ERR>>", {
//     error: e.response.data.message,
//     status: e.response.status,
//     ...e.response.data,
//   });

  if (e.response && e.response.data && e.response.data.errors)
    return {
      error: e.response.data.errors,
      status: e.response.status,
      ...e.response.data,
    };

  if (e.response)
    return {
      error: "Something went wrong, please try again later",
      status: e.response.status,
      ...e.response.data,
    };

  return { error: "Something went wrong, please try again later", status: 503 };
}
