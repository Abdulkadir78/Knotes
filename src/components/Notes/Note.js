import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { styles } from "../../constants";
import InfoModal from "./InfoModal";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    ...styles.noClickHighlight,
  },
  body: {
    paddingBottom: theme.spacing(5),
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
  edited: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
}));

function Note({ note }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.card} onClick={handleModalOpen}>
        <CardContent>
          <Typography gutterBottom sx={styles.title}>
            {note.title}
          </Typography>
          <Typography className={classes.body}>{note.body}</Typography>

          {note.edited && (
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.edited}
            >
              Edited
            </Typography>
          )}
        </CardContent>
      </Card>

      <InfoModal note={note} open={open} handleModalClose={handleModalClose} />
    </>
  );
}
export default Note;
