import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import { colors } from "./constants";
import { themeActions } from "./store/theme/theme-slice";
import Navbar from "./components/Navbar";
import Notes from "./components/Notes/Notes";
import AddNoteForm from "./components/Notes/AddNoteForm";

function App() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    prefersDarkMode && dispatch(themeActions.toggle());
  }, [prefersDarkMode, dispatch]);

  let theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
      primary: {
        main: colors.primary,
        contrastText: colors.light,
      },
      secondary: {
        main: colors.secondary,
      },
      text: {
        secondary: colors.textGrey,
      },
      background: {
        default: darkTheme ? colors.dark : colors.light,
        paper: darkTheme ? colors.dark : colors.white,
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navbar />

        <Container>
          <AddNoteForm />
          <Notes />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
