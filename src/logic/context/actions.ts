export interface CredentialStore {
  jwt: string;
  login: string;
}

interface SetCredentialsAction {
  type: typeof SET_CREDENTIALS;
  payload: CredentialStore;
}

interface ClearCredentialsAction {
  type: typeof CLEAR_CREDENTIALS;
}

export const SET_CREDENTIALS = "SET_CREDENTIALS";
export const CLEAR_CREDENTIALS = "CLEAR_CREDENTIALS";

export type CredentialActionTypes =
  | SetCredentialsAction
  | ClearCredentialsAction;

export const setCredentials = (
  credentials: CredentialStore
): SetCredentialsAction => ({
  type: SET_CREDENTIALS,
  payload: credentials,
});

export const clearCredentials = (): ClearCredentialsAction => ({
  type: CLEAR_CREDENTIALS,
});
