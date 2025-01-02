import { createSlice } from "@reduxjs/toolkit";

export const disasterSlice = createSlice({
  name: "disasters",
  initialState: [],
  reducers: {
    setDisasters: (state, action) => {
      return action.payload;
    },
    addDisaster: (state, action) => {
      state.push(action.payload);
    },
    removeDisaster: (state, action) => {
      return state.filter((disaster) => disaster.id !== action.payload);
    },
  },
});

export const { setDisasters, addDisaster, removeDisaster } =
  disasterSlice.actions;

export default disasterSlice.reducer;
