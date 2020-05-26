import { apiCall } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";

export function setCurrentUser(payload: any) {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
}

export function authUser(type: string, payload: any) {
  return (dispatch: Function) => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, payload).then(
        //@ts-ignore
        ({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
          dispatch(setCurrentUser(user));
          resolve();
        }
      );
    });
  };
}
