import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {},
  reducers: {
    setFilter: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    clearFilters: (state) => {
      return {};
    },
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
