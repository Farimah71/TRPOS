import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const rechangeTokenSlice = createSlice({
  initialState,
  name: "rechangeToken",
  reducers: {
    setRechangeTokenLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = rechangeTokenSlice;
export const { setRechangeTokenLoading } = actions;
export default reducer;
