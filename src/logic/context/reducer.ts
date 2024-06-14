import {
  CLEAR_CREDENTIALS,
  CredentialActionTypes,
  CredentialStore,
  SET_CREDENTIALS,
} from "./actions";

const initialState: CredentialStore = {
  jwt: "",
  login: "",
};

const credentialReducer = (
  state = initialState,
  action: CredentialActionTypes
): CredentialStore => {
  switch (action.type) {
    case SET_CREDENTIALS:
      return {
        ...state,
        jwt: action.payload.jwt,
        login: action.payload.login,
      };
    case CLEAR_CREDENTIALS:
      return {
        ...state,
        jwt: "",
        login: "",
      };
    default:
      return state;
  }
};

export default credentialReducer;
