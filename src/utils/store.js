import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice"
import locationReducer from "./locationSlice"
import cartReducer from "./cartSlice"
import userReducer from "./userAuthSlice"

const store = configureStore({
    reducer: {
        toggle : toggleReducer,
        location: locationReducer,
        cart: cartReducer,
        user: userReducer
    }
})

export default store