import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";
import toggleReducer from "./toggleSlice";

const appStore = configureStore({
    reducer : {
        cartData : cartReducer,
        locationData : locationReducer,
        toggleData : toggleReducer
    }
});

export default appStore;