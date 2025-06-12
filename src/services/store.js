import "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User.js";
export const store = configureStore({
  reducer: { user: UserReducer },
});

export default store;
