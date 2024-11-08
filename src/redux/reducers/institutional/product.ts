import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {
    setProductInfo: (state, action) => {
      state.info = action.payload;
    },
    setProductLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = productSlice;
export const { setProductInfo, setProductLoading } = actions;
export default reducer;
