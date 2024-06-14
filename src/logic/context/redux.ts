import { configureStore } from "@reduxjs/toolkit";
import credentialReducer from "./reducer";

const store = configureStore({ reducer: credentialReducer });

export default store;
