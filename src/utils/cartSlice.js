import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        restaurant: localStorage.getItem("restaurantInfo")
            ? JSON.parse(localStorage.getItem("restaurantInfo"))
            : {},
    },
    reducers: {
        addToCart: (state, action) => {
            const { item: newItem, ResInfoData: resInfo } = action.payload;
            state.cartItems.push(newItem);
            state.restaurant = resInfo;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem(
                "restaurantInfo",
                JSON.stringify(state.restaurant),
            );
        },
        updateItemQuantity: (state, action) => {
            const { itemId, newQuantity } = action.payload;
            const itemIndex = state.cartItems.findIndex(
                item => item?.id === itemId,
            );
            if (itemIndex !== -1) {
                if (newQuantity > 0) {
                    state.cartItems[itemIndex].quantity = newQuantity;
                } else {
                    state.cartItems.splice(itemIndex, 1);
                }
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems),
                );
            }
        },
        clearCart: state => {
            state.cartItems.length = 0;
            state.restaurant = {};
            localStorage.removeItem("cartItems");
            localStorage.removeItem("restaurantInfo");
        },
    },
});

export default cartSlice.reducer;
export const { addToCart, updateItemQuantity, clearCart } = cartSlice.actions;
