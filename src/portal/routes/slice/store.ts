import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/rest-api-slice";
import authReducer from "./auth";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
