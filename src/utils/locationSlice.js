import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        userLocation: null || JSON.parse(localStorage.getItem("userLocation"))
    },
    reducers: {
        getLocation: (state, action) => {
            state.userLocation = action.payload;
            localStorage.setItem("userLocation", JSON.stringify(state.userLocation))
        }
    }
})

export default locationSlice.reducer
export const { getLocation } = locationSlice.actions