import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Spinner() {
  return (
    <Box display="flex" justifyContent="center" mt={8}>
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
