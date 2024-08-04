import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
  [theme.breakpoints.up("xs")]: {
    height: "112px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "120.02px",
  },
  [theme.breakpoints.up("md")]: {
    height: "136.48px",
  },
  [theme.breakpoints.up("lg")]: {
    height: "161.7px",
  },
}));

const ReusableButton = (props) => {
  return (
    <Button
      {...props}
      sx={{
        py: { sm: 0.5, lg: 1.2 },
        px: { sm: 1, lg: 2 },
        bgcolor: "background.default",
        color: "#FFF",
        "&:hover": {
          bgcolor: "#000",
        },
      }}
    >
      {props.children}
    </Button>
  );
};

const MainPage = () => {
  const [userFullName, setUserFullName] = useState(
    sessionStorage.getItem("userFullName")
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");

        const { data: membersResponse } = await axios.get(
          "http://localhost:8000/members",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { data: moviesResponse } = await axios.get("http://localhost:8000/movies", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { data: subscriptionsResponse } = await axios.get(
          "http://localhost:8000/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        dispatch({
          type: "LOAD",
          payload: {
            members: membersResponse,
            movies: moviesResponse,
            subscriptions: subscriptionsResponse,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserFullName(sessionStorage.getItem("userFullName"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.setItem("userFullName", "");
    navigate("/");
  };

  const isXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isXsAndNotMd =
    useMediaQuery((theme) => theme.breakpoints.up("xs")) &&
    !useMediaQuery((theme) => theme.breakpoints.up("md"));

  let variant;
  if (isXs) variant = "h6";
  if (isSm) variant = "h5";
  if (isMd) variant = "h4";
  if (isLg) variant = "h3";

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "block",
            py: 2,
            height: { xs: "fit-content", sm: "fit-content" },
          }}
        >
          <Typography
            sx={{ textAlign: "center", mb: { sm: 2, xs: 1 } }}
            variant={variant}
          >
            Movies - Subscriptions Web Site
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isMd && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: userFullName === "Tal Shalev" ? "70%" : "50%",
                  height: "fit-content",
                  pr: 1,
                }}
              >
                <ReusableButton
                  variant="contained"
                  onClick={() => navigate("movies/all-movies")}
                >
                  Movies
                </ReusableButton>
                <ReusableButton
                  variant="contained"
                  onClick={() => navigate("subscriptions/all-members")}
                >
                  Subscriptions
                </ReusableButton>
                {userFullName === "Tal Shalev" && (
                  <ReusableButton
                    variant="contained"
                    onClick={() => navigate("users/all-users")}
                  >
                    Users Management
                  </ReusableButton>
                )}
                <ReusableButton variant="contained" onClick={logout}>
                  Logout
                </ReusableButton>
              </Box>
            )}
            {isXsAndNotMd && (
              <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <Menu />
              </IconButton>
            )}

            <Typography>
              User Full Name - {sessionStorage.getItem("userFullName")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "primary.light",
            height: userFullName === "Tal Shalev" ? "40%" : "30%",
          },
        }}
        anchor="right"
        open={openDrawer}
        onClose={handleClose}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "100%",
            height: "100%",
            p: 1,
          }}
        >
          <Button
            sx={{
              py: 1.2,
              bgcolor: "background.default",
              mb: { xs: 1 },
              "&:hover": {
                bgcolor: "#000",
              },
            }}
            variant="contained"
            onClick={() => navigate("movies/all-movies")}
          >
            Movies
          </Button>
          <Button
            sx={{
              py: 1.2,
              bgcolor: "background.default",
              mb: { xs: 1 },
              "&:hover": {
                bgcolor: "#000",
              },
            }}
            variant="contained"
            onClick={() => navigate("subscriptions/all-members")}
          >
            Subscriptions
          </Button>
          {userFullName === "Tal Shalev" && (
            <Button
              sx={{
                py: 1.2,
                bgcolor: "background.default",
                mb: { xs: 1 },
                "&:hover": {
                  bgcolor: "#000",
                },
              }}
              variant="contained"
              onClick={() => navigate("users/all-users")}
            >
              Users Management
            </Button>
          )}
          <Button
            sx={{
              py: 1.2,
              bgcolor: "#000",
              "&:hover": {
                bgcolor: "#000",
              },
            }}
            variant="contained"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Offset />
      <Outlet />
    </>
  );
};

export default MainPage;
