import { createSlice } from "@reduxjs/toolkit";
const initialState = { email: "None" };
export const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogIn: (state, action) => {
      console.log("hello boi", action.payload);
      state.email = action.payload;
    },
    LogOut: () => (state.email = "None"),
  },
});
export const { LogIn, LogOut } = User.actions;
export default User.reducer;
