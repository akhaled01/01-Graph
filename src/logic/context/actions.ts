export interface CredentialStore {
  jwt: string;
  login: string;
}

export const SET_CREDENTIALS = "SET_CREDENTIALS";
export const CLEAR_CREDENTIALS = "CLEAR_CREDENTIALS";

export interface JwtAction {
  type: typeof SET_CREDENTIALS;
  payload: string;
}

export interface LoginAction {
  type: typeof SET_CREDENTIALS;
  payload: string;
}

export interface ClearCredentialsAction {
  type: typeof CLEAR_CREDENTIALS;
}

export type CredentialActionTypes =
  | JwtAction
  | LoginAction
  | ClearCredentialsAction;

export const setJwt = (jwt: string): JwtAction => ({
  type: SET_CREDENTIALS,
  payload: jwt,
});

export const setLogin = (login: string): LoginAction => ({
  type: SET_CREDENTIALS,
  payload: login,
});

export const clearCredentials = (): ClearCredentialsAction => ({
  type: CLEAR_CREDENTIALS,
});
