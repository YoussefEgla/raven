import axios from "axios";

export function apiCall(method, path, data) {
  return new Promise(async function (resolve, reject) {
    return await axios[method](path, data)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        reject(err.response.data.error);
      });
  });
}
