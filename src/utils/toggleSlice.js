import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name : "toggle",
    initialState : {
        isOpen : false,
        isModalOpen : false
    },
    reducers : {
        toggleMenu : (state) => {
            state.isOpen = !state.isOpen;
        },
        toggleModal : (state) => {
            state.isModalOpen = !state.isModalOpen;
        }
    }
})

export default toggleSlice.reducer;
export const {toggleMenu, toggleModal} = toggleSlice.actions;