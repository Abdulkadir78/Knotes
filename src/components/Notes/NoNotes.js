import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";

function NoNotes() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);

  const typographyColor = darkTheme ? "inherit" : "textSecondary";

  return (
    <>
      <Typography
        variant="h6"
        color={typographyColor}
        align="center"
        sx={{ marginTop: 15, fontWeight: 300 }}
      >
        No notes
      </Typography>

      <Typography
        variant="h6"
        color={typographyColor}
        align="center"
        sx={{ fontWeight: 300 }}
      >
        Create one up there ☝
      </Typography>
    </>
  );
}

export default NoNotes;
