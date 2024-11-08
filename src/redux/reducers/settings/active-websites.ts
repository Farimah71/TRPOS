import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../../types/initial-state.type";

const initialState: InitialState = {
  info: {},
  loading: false,
};

const activeWebsiteSlice = createSlice({
  initialState,
  name: "activeWebsite",
  reducers: {
    setActiveWebsiteInfo: (state, action) => {
      state.info = action.payload;
    },
    setActiveWebsiteLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = activeWebsiteSlice;
export const { setActiveWebsiteInfo, setActiveWebsiteLoading } = actions;
export default reducer;
