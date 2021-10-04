import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, notesCollection } from "../../../firebase/config";

const getNotesFromDb = createAsyncThunk("notes/getNotes", async () => {
  const snapshot = await getDocs(notesCollection);
  const notes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt.toDate().toString(),
  }));

  notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return { notes };
});

const addNoteToDb = createAsyncThunk("notes/addNote", async (values) => {
  const data = {
    ...values,
    edited: false,
  };

  const docRef = await addDoc(notesCollection, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  return { ...data, id: docRef.id };
});

const removeNoteFromDb = createAsyncThunk("notes/removeNote", async (id) => {
  const docRef = doc(db, `notes/${id}`);
  await deleteDoc(docRef);
  return { id };
});

const updateNoteInDb = createAsyncThunk(
  "notes/updateNote",
  async ({ id, ...values }) => {
    const data = {
      ...values,
      edited: true,
    };

    const docRef = doc(db, `notes/${id}`);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });

    return { id, ...data };
  }
);

export { getNotesFromDb, addNoteToDb, removeNoteFromDb, updateNoteInDb };
