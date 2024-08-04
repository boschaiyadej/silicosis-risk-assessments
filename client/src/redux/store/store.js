import { configureStore } from "@reduxjs/toolkit";
import riskSliceReducer from "../slices/riskSlice";

export const store = configureStore({
  reducer: {
    risk: riskSliceReducer,
  },
});
