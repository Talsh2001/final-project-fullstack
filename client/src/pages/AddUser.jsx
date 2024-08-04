import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Typography, Box, Button } from "@mui/material";

const AddUser = () => {
  const navigate = useNavigate();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    sessionTimeOut: "",
    createdDate: `${day}.${month}.${year}`,
    permissions: "",
  });

  const [username, setUsername] = useState({ username: "" });

  const handleChecking = (permissionName) => {
    return userData.permissions.includes(permissionName);
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const permissions = userData.permissions;
    const hasViewSubs = permissions.includes("viewMembers");
    const hasCreateSubs = permissions.includes("createMembers");
    const hasUpdateSubs = permissions.includes("updateMembers");
    const hasDeleteSubs = permissions.includes("deleteMembers");
    const hasViewMovies = permissions.includes("viewMovies");
    const hasCreateMovies = permissions.includes("createMovies");
    const hasUpdateMovies = permissions.includes("updateMovies");
    const hasDeleteMovies = permissions.includes("deleteMovies");

    if (name === "viewMembers") {
      if (!hasViewSubs) {
        setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
      } else {
        if (hasDeleteSubs || hasCreateSubs || hasUpdateSubs) {
          alert("Cannot remove view permission");
        } else {
          setUserData((u) => ({
            ...u,
            permissions: permissions.filter((per) => per !== name),
          }));
        }
      }
    }

    if (name === "createMembers") {
      if (checked) {
        if (!hasViewSubs) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMembers"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "updateMembers") {
      if (checked) {
        if (!hasViewSubs) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMembers"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "deleteMembers") {
      if (checked) {
        if (!hasViewSubs) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMembers"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "viewMovies") {
      if (!hasViewMovies) {
        setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
      } else {
        if (hasCreateMovies || hasUpdateMovies || hasDeleteMovies) {
          alert("Cannot remove view permission");
        } else {
          setUserData((u) => ({
            ...u,
            permissions: permissions.filter((per) => per !== name),
          }));
        }
      }
    }

    if (name === "createMovies") {
      if (checked) {
        if (!hasViewMovies) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMovies"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "updateMovies") {
      if (checked) {
        if (!hasViewMovies) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMovies"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "deleteMovies") {
      if (checked) {
        if (!hasViewMovies) {
          setUserData((u) => ({
            ...u,
            permissions: [...permissions, name, "viewMovies"],
          }));
        } else {
          setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
        }
      } else {
        setUserData((u) => ({
          ...u,
          permissions: permissions.filter((per) => per !== name),
        }));
      }
    }

    if (name === "createMembers") {
      setUserData((u) => ({ ...u, permissions: [...permissions, name] }));
    }
  };

  const save = async (e) => {
    e.preventDefault();
    const { data: addUserResp } = await axios.post("http://localhost:8000/users", {
      username: username.username,
    });
    console.log(addUserResp);

    const { data: userId } = await axios.get(
      `http://localhost:8000/users/id/${username.username}`
    );

    const { data: usersFileResp } = await axios.post(
      "http://localhost:8000/files/write-users-file",
      {
        id: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        CreatedDate: userData.createdDate,
        sessionTimeOut: userData.sessionTimeOut,
      }
    );
    console.log(usersFileResp);

    const { data: permissionsFileResp } = await axios.post(
      "http://localhost:8000/files/write-permissions-file",
      {
        userId: userId,
        permissions: userData.permissions,
      }
    );
    console.log(permissionsFileResp);
  };

  return (
    <>
      <Typography sx={{ fontWeight: 700, py: 4 }} variant="h5">
        Add New User
      </Typography>
      <form onSubmit={save}>
        <Typography variant="subtitle1" sx={{ display: "inline", mr: 1 }}>
          First Name:
        </Typography>
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
        />
        <br />
        <Typography variant="subtitle1" sx={{ display: "inline", mr: 1 }}>
          Last Name:
        </Typography>
        <input
          type="text"
          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
        />
        <br />
        <Typography variant="subtitle1" sx={{ display: "inline", mr: 1 }}>
          Username:
        </Typography>
        <input
          type="text"
          onChange={(e) => setUsername({ ...username, username: e.target.value })}
        />
        <br />
        <Typography variant="subtitle1" sx={{ display: "inline", mr: 1 }}>
          Session Time Out (in minuets):
        </Typography>
        <input
          type="number"
          onChange={(e) => setUserData({ ...userData, sessionTimeOut: e.target.value })}
        />
        <Typography sx={{ fontWeight: 700, py: 3 }} variant="h6">
          Permissions:
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>View Members</Typography>
          <input
            type="checkbox"
            checked={handleChecking("viewMembers")}
            onChange={handleCheckbox}
            name="viewMembers"
            id="viewMembers"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Create Members</Typography>
          <input
            type="checkbox"
            checked={handleChecking("createMembers")}
            onChange={handleCheckbox}
            name="createMembers"
            id="createMembers"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Update Members</Typography>
          <input
            type="checkbox"
            checked={handleChecking("updateMembers")}
            onChange={handleCheckbox}
            name="updateMembers"
            id="updateMembers"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Delete Members</Typography>
          <input
            type="checkbox"
            checked={handleChecking("deleteMembers")}
            onChange={handleCheckbox}
            name="deleteMembers"
            id="deleteMembers"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>View Movies</Typography>
          <input
            type="checkbox"
            checked={handleChecking("viewMovies")}
            onChange={handleCheckbox}
            name="viewMovies"
            id="viewMovies"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Create Movies</Typography>
          <input
            type="checkbox"
            checked={handleChecking("createMovies")}
            onChange={handleCheckbox}
            name="createMovies"
            id="createMovies"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Update Movies</Typography>
          <input
            type="checkbox"
            checked={handleChecking("updateMovies")}
            onChange={handleCheckbox}
            name="updateMovies"
            id="updateMovies"
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Delete Movies</Typography>
          <input
            type="checkbox"
            checked={handleChecking("deleteMovies")}
            onChange={handleCheckbox}
            name="deleteMovies"
            id="deleteMovies"
          />
        </Box>
        <br /> <br />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button sx={{ mr: 2 }} variant="contained" type="submit">
              Save
            </Button>
            <Button onClick={() => navigate("/main/users")}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddUser;
