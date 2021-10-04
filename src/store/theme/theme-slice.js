import { createSlice } from "@reduxjs/toolkit";

const initialState = { darkTheme: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
});

const themeActions = themeSlice.actions;

export { themeActions };
export default themeSlice.reducer;
