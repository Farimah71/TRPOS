import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const userAuthorizationSlice = createSlice({
  initialState,
  name: "userAuthorization",
  reducers: {
    setUserAuthorizationInfo: (state, action) => {
      state.info = action.payload;
    },
    setUserAuthorizationLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = userAuthorizationSlice;
export const { setUserAuthorizationInfo, setUserAuthorizationLoading } =
  actions;
export default reducer;
