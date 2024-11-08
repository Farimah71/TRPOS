import { createSlice } from "@reduxjs/toolkit";

interface task {
  info: any;
  loading: boolean;
  error: [];
}

const initialState: task = {
  info: {},
  loading: false,
  error: [],
};

const taskDetailSlice = createSlice({
  initialState,
  name: "taskDetail",
  reducers: {
    setTaskDetails: (state, action) => {
      state.info = action.payload;
    },
    setTaskDetailLoading: (state, action: { payload: boolean }) => {
      state.loading = action.payload;
    },
    setTaskDetailError: (state, action) => {
      state.error = action.payload;
    },
    // setTaskDetailEmpty: (state) => {
    //   state.info = {};
    // },
  },
});

const { reducer, actions } = taskDetailSlice;
export const {
  setTaskDetails,
  setTaskDetailLoading,
  setTaskDetailError,
  // setTaskDetailEmpty,
} = actions;
export default reducer;
