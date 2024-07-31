import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8000/users/login";

import { Typography, Button, Box, TextField, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const StyledTextField = (props) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        sx: {
          height: "25px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 0.5,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000",
            borderWidth: 2,
          },
          "& .MuiOutlinedInput-input": {
            p: 0,
          },
          "& .MuiInputBase-input": {
            p: 0,
            pl: 0.7,
            color: "#000",
          },
        },
      }}
      InputLabelProps={{
        ...props.InputLabelProps,
        sx: {
          lineHeight: "20px",
        },
      }}
      sx={{
        bgcolor: "#FFF",
        borderRadius: 0.5,
        "& .MuiOutlinedInput-root": {
          "&:focus-within": {
            border: "1px solid #FFF",
          },
        },
        ...props.sx,
      }}
    />
  );
};

const Login = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const login = async () => {
    const { data } = await axios.post(url, user);
    sessionStorage.setItem("accessToken", data.accessToken);

    const { data: users } = await axios.get(
      "http://localhost:8000/files/read-users-file"
    );

    const { data: id } = await axios.get(
      `http://localhost:8000/users/id/${user.username}`
    );

    const currentUser = users.users.find((u) => u.id === id);

    sessionStorage.setItem(
      "userFullName",
      `${currentUser.firstName} ${currentUser.lastName}`
    );

    navigate("/main");
  };

  const isXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let variant;
  if (isXs) variant = "h5";
  if (isSm) variant = "h4";
  if (isMd) variant = "h3";
  if (isLg) variant = "h2";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box sx={{ mx: 10, textAlign: "center" }}>
          <Typography sx={{ mb: 5, textDecoration: "underline" }} variant={variant}>
            Movies - Subscriptions Web Site
          </Typography>
          <Typography sx={{ mb: 2.5 }} variant="h4">
            Login Page
          </Typography>
          <Box sx={{ mb: 0.5 }}>
            <Typography sx={{ display: "inline" }} variant="body1">
              Username:
            </Typography>{" "}
            <StyledTextField
              type="text"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Box>
          <Box>
            <Typography sx={{ display: "inline" }} variant="body1">
              Password:
            </Typography>{" "}
            <StyledTextField
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{ borderRadius: 10 }}
              variant="contained"
              color="primary"
              onClick={login}
            >
              Login
            </Button>
          </Box>
          <br />
          <br />
          <Typography sx={{ display: "inline" }} variant="body1">
            New User?
          </Typography>{" "}
          <Link href="/create-account">Create Account</Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
