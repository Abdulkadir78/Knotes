import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { styles } from "../../constants";
import { notesActions } from "../../store/notes/notes-slice";
import {
  removeNoteFromDb,
  updateNoteInDb,
} from "../../store/notes/side-effects";

function InfoModal({ note, open, handleModalClose }) {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: note.title,
    body: note.body,
  });

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClose = () => {
    setValues({
      title: note.title,
      body: note.body,
    });
    handleModalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.title !== note.title || note.body !== values.body) {
      dispatch(notesActions.startLoading());
      dispatch(updateNoteInDb({ id: note.id, ...values }));
    }
    handleModalClose();
  };

  const handleDelete = () => {
    dispatch(notesActions.startLoading());
    dispatch(removeNoteFromDb(note.id));
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose} scroll="paper">
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <InputBase
              name="title"
              fullWidth
              placeholder="Title"
              autoComplete="off"
              sx={styles.title}
              value={values.title}
              onChange={handleChange}
            />
          </DialogTitle>

          <DialogContent>
            <InputBase
              name="body"
              fullWidth
              placeholder="Take a note..."
              autoComplete="off"
              sx={styles.body}
              multiline
              rows={4}
              value={values.body}
              onChange={handleChange}
            />
          </DialogContent>

          <DialogActions>
            <IconButton
              onClick={handleDelete}
              sx={{ position: "absolute", left: 13, bottom: 9 }}
            >
              <DeleteIcon fontSize="small" color="primary" />
            </IconButton>
            <Button onClick={handleSubmit}>Done</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default InfoModal;
