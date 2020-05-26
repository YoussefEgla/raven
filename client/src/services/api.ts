import axios from "axios";

export function apiCall(method: string, path: string, data: any) {
  return new Promise(async (resolve, reject) => {
    //@ts-ignore
    await axios[method](path, data)
      .then((res: any) => {
        return resolve(res.data);
      })
      .catch((err: any) => {
        return reject(err.reponse);
      });
  });
}
