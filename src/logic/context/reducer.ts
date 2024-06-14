import {
  CLEAR_CREDENTIALS,
  CredentialActionTypes,
  SET_CREDENTIALS,
} from "./actions";

interface CredentialStore {
  jwt: string;
  login: string;
}

const initialJwtState: CredentialStore = {
  jwt: "",
  login: "",
};

const jwtReducer = (
  state = initialJwtState.jwt,
  action: CredentialActionTypes
): string => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return action.payload;
    case CLEAR_CREDENTIALS:
      return "";
    default:
      return state;
  }
};

const initialLoginState: CredentialStore = {
  jwt: "",
  login: "",
};

const loginReducer = (
  state = initialLoginState.login,
  action: CredentialActionTypes
): string => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return action.payload;
    case CLEAR_CREDENTIALS:
      return "";
    default:
      return state;
  }
};

export { jwtReducer, loginReducer };
