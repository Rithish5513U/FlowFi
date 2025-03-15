import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  preferences: {},
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { updatePreferences } = preferenceSlice.actions;
export default preferenceSlice.reducer;
