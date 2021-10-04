import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";

import { themeActions } from "../store/theme/theme-slice";

function Navbar() {
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(themeActions.toggle());
  };

  return (
    <Box>
      <AppBar color="inherit" elevation={1}>
        <Toolbar sx={{ marginInline: 30 }}>
          <Typography
            variant="h4"
            sx={{ flexGrow: 1, fontFamily: ` "Birthstone", "cursive"` }}
          >
            Knotes
          </Typography>

          <IconButton color="inherit" onClick={handleThemeChange}>
            {darkTheme ? <Brightness2Icon /> : <WbSunnyIcon color="primary" />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Toolbar />
    </Box>
  );
}

export default Navbar;
