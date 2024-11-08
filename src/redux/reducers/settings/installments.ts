import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const installmentSlice = createSlice({
  initialState,
  name: "installment",
  reducers: {
    setInstallmentInfo: (state, action) => {
      state.info = action.payload;
    },
    setInstallmentLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = installmentSlice;
export const { setInstallmentInfo, setInstallmentLoading } = actions;
export default reducer;
