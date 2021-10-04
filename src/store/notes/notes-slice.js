import { createSlice } from "@reduxjs/toolkit";

import {
  getNotesFromDb,
  addNoteToDb,
  removeNoteFromDb,
  updateNoteInDb,
} from "./side-effects";

const initialState = {
  notes: [],
  loading: true,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },

  extraReducers: {
    [getNotesFromDb.fulfilled]: (state, action) => {
      state.notes = action.payload.notes;
      state.loading = false;
    },

    [addNoteToDb.fulfilled]: (state, action) => {
      state.notes.unshift(action.payload);
      state.loading = false;
    },

    [removeNoteFromDb.fulfilled]: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload.id);
      state.loading = false;
    },

    [updateNoteInDb.fulfilled]: (state, action) => {
      let existingNoteIndex = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notes[existingNoteIndex] = action.payload;
      state.loading = false;
    },
  },
});

const notesActions = notesSlice.actions;

export { notesActions };
export default notesSlice.reducer;
