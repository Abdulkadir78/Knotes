import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "./theme/theme-slice";
import notesReducer from "./notes/notes-slice";

const store = configureStore({
  reducer: { theme: themeReducer, notes: notesReducer },
});

export default store;
