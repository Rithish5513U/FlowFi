import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        checkedIn:false,
    },
    reducers: {
        checkedIn(state, action) {
            state.checkedIn = true;
        }
    }
});

export const {checkedIn} = userSlice.actions;
export default userSlice.reducer;