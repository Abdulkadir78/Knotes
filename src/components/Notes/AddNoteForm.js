import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import InputBase from "@mui/material/InputBase";

import { styles } from "../../constants";
import { addNoteToDb } from "../../store/notes/side-effects";
import { notesActions } from "../../store/notes/notes-slice";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingInline: theme.spacing(2),
    paddingTop: theme.spacing(2),
    ...styles.title,
  },
  body: {
    padding: theme.spacing(2),
    ...styles.body,
  },
  fab: {
    position: "absolute",
    right: 25,
    bottom: -20,
  },
}));

const defaultValues = {
  title: "",
  body: "",
};

function AddNoteForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showTitleField, setShowTitleField] = useState(false);
  const [values, setValues] = useState(defaultValues);

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowTitleField = () => {
    setShowTitleField(true);
  };

  const handleHideTitleField = () => {
    const notitleOrBody = !(values.title || values.body);
    // if title field is shown and nothing is entered, then hide the title field
    // when backdrop is clicked
    showTitleField && notitleOrBody && setShowTitleField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(values.title.trim() || values.body.trim())) {
      setValues({ title: "", body: "" });
      return setShowTitleField(true);
    }

    dispatch(notesActions.startLoading());
    dispatch(addNoteToDb(values));
    setValues(defaultValues);
    setShowTitleField(false);
  };

  return (
    <Grid container justifyContent="center">
      <Box sx={styles.backdrop} onClick={handleHideTitleField}></Box>

      <Grid item xs={12} sm={6}>
        <Paper sx={{ position: "relative" }}>
          <form onSubmit={handleSubmit}>
            {showTitleField && (
              <InputBase
                name="title"
                fullWidth
                placeholder="Title"
                autoComplete="off"
                className={classes.title}
                value={values.title}
                onChange={handleChange}
              />
            )}

            <InputBase
              name="body"
              fullWidth
              placeholder="Take a note..."
              autoComplete="off"
              rows={4}
              className={classes.body}
              multiline={showTitleField}
              autoFocus={showTitleField}
              onFocus={handleShowTitleField}
              value={values.body}
              onChange={handleChange}
            />

            <Fab
              type="submit"
              color="primary"
              size="medium"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AddNoteForm;
