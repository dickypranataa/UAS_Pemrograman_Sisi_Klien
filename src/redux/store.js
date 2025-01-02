import { configureStore } from "@reduxjs/toolkit";
import disasterReducer from "./disasterSlice";

export const store = configureStore({
  reducer: {
    disasters: disasterReducer,
  },
});
