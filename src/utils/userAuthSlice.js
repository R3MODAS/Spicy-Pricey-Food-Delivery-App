import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
    name: "user",
    initialState: {
        userDetails: localStorage.getItem("userDetails")
            ? JSON.parse(localStorage.getItem("userDetails"))
            : null,
    },
    reducers: {
        addUser: (state, action) => {
            state.userDetails = action.payload;
            localStorage.setItem(
                "userDetails",
                JSON.stringify(state.userDetails),
            );
        },
        removeUser: () => {
            localStorage.removeItem("userDetails");
        },
    },
});

export default userAuthSlice.reducer;
export const { addUser, removeUser } = userAuthSlice.actions;
