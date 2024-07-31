import { Outlet, useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Movies = () => {
  const navigate = useNavigate();

  const isXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let variant;
  if (isXs) variant = "h3";
  if (isSm) variant = "h3";
  if (isMd) variant = "h2";
  if (isLg) variant = "h2";

  return (
    <>
      <Box sx={{ textAlign: "center", p: 2.5 }}>
        <Typography sx={{ textDecoration: "underline" }} variant={variant}>
          Movies
        </Typography>
        <br />
        <Button
          sx={{
            bgcolor: location.pathname.endsWith("/all-movies")
              ? "primary.dark"
              : "primary.main",
            color: "#FFF",
            mr: 1,
            "&:hover": {
              bgcolor: "#000",
            },
          }}
          onClick={() => navigate("all-movies")}
        >
          All Movies
        </Button>

        <Button
          sx={{
            bgcolor: location.pathname.endsWith("/add-movie")
              ? "primary.dark"
              : "primary.main",
            color: "#FFF",
            "&:hover": {
              bgcolor: "#000",
            },
          }}
          onClick={() => navigate("add-movie")}
        >
          Add Movie
        </Button>

        <Outlet />
      </Box>
    </>
  );
};

export default Movies;
