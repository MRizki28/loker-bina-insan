import { configureStore } from "@reduxjs/toolkit";
import checkLoginReducer from "./slices/checkLogin";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, checkLoginReducer);

const store = configureStore({
    reducer: {
        checkLogin: persistedReducer,
    },
});

export const persistor = persistStore(store);
export default store;
