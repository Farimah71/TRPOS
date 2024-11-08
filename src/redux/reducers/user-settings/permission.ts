import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const permissionSlice = createSlice({
  initialState,
  name: "permission",
  reducers: {
    setPermissionInfo: (state, action) => {
      state.info = action.payload;
    },
    setPermissionLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = permissionSlice;
export const { setPermissionInfo, setPermissionLoading } = actions;
export default reducer;
