import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state,action) => {
            state.items.push(action.payload);
        },
        clearCart : (state) => {
            state.items.length = 0;
        },
        deleteItem : (state,action) => {
            const itemId = action.payload;
            state.items = state?.items?.filter((card) => card?.card?.info?.id !== itemId)
        }

    }
})

export default cartSlice.reducer;
export const {addItem, clearCart, deleteItem} = cartSlice.actions;