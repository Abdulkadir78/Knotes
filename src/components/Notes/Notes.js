import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Masonry from "react-masonry-css";

import { getNotesFromDb } from "../../store/notes/side-effects";
import Note from "./Note";
import NoNotes from "./NoNotes";
import Spinner from "../Spinner";

import styles from "./notes.module.css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);

  useEffect(() => {
    dispatch(getNotesFromDb());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  if (!notes.length) {
    return <NoNotes />;
  }

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["masonry-grid"]}
      columnClassName={styles["masonry-grid_column"]}
    >
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </Masonry>
  );
}

export default Notes;
