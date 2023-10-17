import { configureStore } from "@reduxjs/toolkit";
import spendingReducer from "./spendingSlice";

export const store = configureStore({
  reducer: { spending: spendingReducer },
});
