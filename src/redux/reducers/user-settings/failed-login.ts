import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const failedLoginSlice = createSlice({
  initialState,
  name: "failedLogin",
  reducers: {
    setFailedLoginInfo: (state, action) => {
      state.info = action.payload;
    },
    setFailedLoginLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = failedLoginSlice;
export const { setFailedLoginLoading, setFailedLoginInfo } = actions;
export default reducer;
