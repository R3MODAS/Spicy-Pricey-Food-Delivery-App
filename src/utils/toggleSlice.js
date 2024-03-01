import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: "toggle",
    initialState: {
        isLocationSidebarOpen: false,
        isLoginSidebarOpen: false
    },
    reducers: {
        toggleLocationSidebar: (state) => {
            state.isLocationSidebarOpen = !state.isLocationSidebarOpen
        },
        toggleLoginSidebar: (state) => {
            state.isLoginSidebarOpen = !state.isLoginSidebarOpen
        }
    }
})


export const {toggleLocationSidebar, toggleLoginSidebar} = toggleSlice.actions
export default toggleSlice.reducer;