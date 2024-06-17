"use client";

import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { jwtReducer, loginReducer } from "./reducer";
import storage from "./storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/custom/loading";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  jwt: jwtReducer,
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer as Reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="w-screen h-screen flex items-center justify-center bg-black">
            <Loading />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
