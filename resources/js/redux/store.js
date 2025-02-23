import { configureStore } from "@reduxjs/toolkit";
import checkLogin from "./slices/checkLogin";

const store = configureStore({
    reducer:{
        checkLogin: checkLogin
    }
})

console.log(store.getState())

store.subscribe(() => {
    store.getState()
})

export default store