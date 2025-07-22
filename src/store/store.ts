import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/api/api";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import toggleSidebarReducer from "@/store/slices/toggleSidebarSlice";
import tabReducer from "@/store/slices/tabSlice";
import authReducer from "@/store/slices/adminSlice";
import authTokenReducer from "@/store/slices/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["admin", "authToken"],
};

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  toggleSidebar: toggleSidebarReducer,
  tabs: tabReducer,
  admin: authReducer,
  auth: authTokenReducer,
};

const combinedReducer = combineReducers(rootReducer);
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
