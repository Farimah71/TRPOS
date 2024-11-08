import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const MerchantRoleSlice = createSlice({
  initialState,
  name: "MerchantRole",
  reducers: {
    setMerchantRoleInfo: (state, action) => {
      state.info = action.payload;
    },
    setMerchantRoleLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = MerchantRoleSlice;
export const { setMerchantRoleInfo, setMerchantRoleLoading } = actions;
export default reducer;
