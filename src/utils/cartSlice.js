import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        restaurant: localStorage.getItem("restaurantInfo") ? JSON.parse(localStorage.getItem("restaurantInfo")) : {},
    },
    reducers: {
        addItem: (state, action) => {
            const { item: newItem, ResInfoData: resInfo } = action.payload
            state.cartItems = [...state.cartItems, newItem]
            state.restaurant = resInfo
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            localStorage.setItem("restaurantInfo", JSON.stringify(state.restaurant))
        },
        deleteItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item?.id !== itemId)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems.length = 0
            state.restaurant = {}
            localStorage.removeItem("cartItems")
            localStorage.removeItem("restaurantInfo")
        }
    }
})

export default cartSlice.reducer
export const { addItem, deleteItem, clearCart } = cartSlice.actions