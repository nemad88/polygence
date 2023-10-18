import { configureStore } from "@reduxjs/toolkit";
import spendingReducer from "./spendingSlice";

export const rootReducer = {
  spending: spendingReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
