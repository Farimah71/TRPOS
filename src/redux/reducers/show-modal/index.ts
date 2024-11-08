import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: { isShow: false, type: "" },
};

const showModalSlice = createSlice({
  initialState,
  name: "showModal",
  reducers: {
    setShowModal: (
      state,
      action: { payload: { isShow: boolean; type: string } }
    ) => {
      state.showModal = action.payload;
    },
  },
});

const { reducer, actions } = showModalSlice;
export const { setShowModal } = actions;
export default reducer;
