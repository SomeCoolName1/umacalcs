import "./App.scss";
import Main from "./components/main";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./state/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";

//Look into this more, essentailly saves redux state into localstorage to persist on refresh/reloads/window closes
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, userSlice);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <div className="App">
            <Main />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
