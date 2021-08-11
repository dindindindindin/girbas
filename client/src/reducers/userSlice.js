import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { loggedInUser } = slice.actions;

export default slice.reducer;
