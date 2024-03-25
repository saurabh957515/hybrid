import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { name: "Dashboard", to: "/dashboard", current: true },
  { name: "Authors", to: "/authors", current: false },
  { name: "Books", to: "/books", current: false },
  { name: "Start...", to: "/readbook", current: false },
];

export const counterSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCurrentByName: (state, action) => {
      const name = action.payload;
      state.map((item) => {
        if (item?.name === name) {
          item["current"] = true;
        } else {
          item["current"] = false;
        }
        return item;
      });
    },
  },
});

export const { setCurrentByName } = counterSlice.actions;

export default counterSlice.reducer;
