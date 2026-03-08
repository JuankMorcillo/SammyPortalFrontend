import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import toastReducer from "./slices/toastSlice";
import reloadReducer from "./slices/reloadSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        post: postReducer,
        toast: toastReducer,
        reload: reloadReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch