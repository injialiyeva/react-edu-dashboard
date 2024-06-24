import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    filters: filterReducer,
    modal: modalReducer,
  },
});

export default store;
