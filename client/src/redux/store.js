import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice.js";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the auth reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid non-serializable value warnings
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
