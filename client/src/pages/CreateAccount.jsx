import { useState } from "react";
import axios from "axios";

import { Box, Typography, Button, Link } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateAccount = () => {
  const [user, setUser] = useState({});

  const manageCreate = async () => {
    const { data: users } = await axios.get(`http://localhost:8000/users`);

    const currentUser = users.find((u) => u.username === user.username);

    if (!currentUser) {
      alert("Username Not In The System: New Users Has To Be Created By Admin!");
    }

    if (currentUser.password) {
      alert("User Already Has a Valid Password");
    }

    const { data: resp } = await axios.put(
      `http://localhost:8000/users/${currentUser._id}`,
      { password: user.password }
    );

    console.log(resp);
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
          <Typography sx={{ fontWeight: 700, mb: 3 }} variant="h5">
            Create an Account
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 0.4 }}>
            <Typography variant="subtitle1" sx={{ mr: 0.7 }}>
              Username:
            </Typography>
            <input
              type="text"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle1" sx={{ mr: 0.7 }}>
              Password:
            </Typography>
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Box>
          <Button
            sx={{ borderRadius: 10, mt: 3 }}
            variant="contained"
            color="primary"
            onClick={manageCreate}
          >
            Create
          </Button>
          <br /> <br />
          <Link href="/">Login</Link>
        </Box>
      </Box>
    </>
  );
};

export default CreateAccount;
