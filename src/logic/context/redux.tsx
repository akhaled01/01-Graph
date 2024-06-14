"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { jwtReducer, loginReducer } from "./reducer";

const rootReducer = combineReducers({
  jwt: jwtReducer,
  login: loginReducer,
});

const store = configureStore({ reducer: rootReducer });

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
