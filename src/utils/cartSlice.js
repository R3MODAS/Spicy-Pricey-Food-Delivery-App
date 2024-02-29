import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const isItemInCart = state.cartItems.some(cartItem => cartItem?.card?.info?.id === newItem?.card?.info?.id)
            if (!isItemInCart) {
                state.cartItems = [...state.cartItems, newItem]
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },
        deleteItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item?.card?.info?.id !== itemId)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems.length = 0
            localStorage.removeItem("cartItems")
        }
    }
})

export default cartSlice.reducer
export const { addItem, deleteItem, clearCart } = cartSlice.actions