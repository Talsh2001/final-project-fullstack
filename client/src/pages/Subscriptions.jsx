import { Outlet, useNavigate } from "react-router-dom";

import { Typography, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Subscriptions = () => {
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
          Subscriptions
        </Typography>
        <br />
        <Button
          sx={{
            bgcolor: location.pathname.endsWith("/all-members")
              ? "primary.dark"
              : "primary.main",
            color: "#FFF",
            mr: 1,
            "&:hover": {
              bgcolor: "#000",
            },
          }}
          onClick={() => navigate("/main/subscriptions/all-members")}
        >
          All Members
        </Button>

        <Button
          sx={{
            bgcolor: location.pathname.endsWith("/add-member")
              ? "primary.dark"
              : "primary.main",
            color: "#FFF",
            "&:hover": {
              bgcolor: "#000",
            },
          }}
          onClick={() => navigate("add-member")}
        >
          Add Member
        </Button>

        <Outlet />
      </Box>
    </>
  );
};

export default Subscriptions;
