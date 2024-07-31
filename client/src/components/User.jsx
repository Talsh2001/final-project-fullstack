import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Card, Typography, Button, Box } from "@mui/material";

const User = ({ user }) => {
  const navigate = useNavigate();

  const deleteUser = async () => {
    const { data: userId } = await axios.get(
      `http://localhost:8000/users/id/${user.username}`
    );

    const { data: deleteUser } = await axios.delete(
      `http://localhost:8000/users/${userId}`
    );
    console.log(deleteUser);

    const { data: deleteUserFile } = await axios.post(
      `http://localhost:8000/files/remove-user/${userId}`
    );
    console.log(deleteUserFile);

    const { data: deletePermissionFile } = await axios.post(
      `http://localhost:8000/files/remove-permission/${userId}`
    );
    console.log(deletePermissionFile);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            color: "background.default",
            margin: 5,
            padding: 2,
            width: { lg: "30vw", md: "40vw", sm: "50vw", xs: "70vw" },
          }}
        >
          <Typography sx={{ mb: 1 }} variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="subtitle1">Username: {user.username}</Typography>
          <Typography variant="subtitle1">
            Session Time Out: {user.sessionTimeOut}
          </Typography>
          <Typography variant="subtitle1">Created Date: {user.createdDate}</Typography>
          <Typography variant="subtitle1">
            Permissions:{" "}
            <strong>
              {user.permissions !== "" ? user.permissions.join(" ") : "None"}
            </strong>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              sx={{ mr: 2 }}
              variant="contained"
              onClick={() =>
                navigate(
                  "/main/users/edit-user",
                  {
                    state: { user: user },
                  },
                  { replace: true }
                )
              }
            >
              Edit
            </Button>
            <Button
              sx={{ bgcolor: "background.default", "&:hover": { bgcolor: "#000" } }}
              variant="contained"
              onClick={deleteUser}
            >
              Delete
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default User;
