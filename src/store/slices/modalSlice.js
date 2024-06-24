import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modalData",
  initialState: {},
  reducers: {
    setModalData: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    // closeModal: (state) => {
    //   state.isOpen = false;
    //   state.content = null;
    // },
  },
});

export const { openModal } = modalSlice.actions;
export default modalSlice.reducer;
