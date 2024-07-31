import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Typography, Box, Button } from "@mui/material";

const EditUser = () => {
  const location = useLocation();
  const user = location.state.user;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    createdDate: user.createdDate,
    sessionTimeOut: user.sessionTimeOut,
    permissions: user.permissions,
  });

  const isAdmin = userData.permissions[0] === "Admin";

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: userId } = await axios.get(
        `http://localhost:8000/users/id/${user.username}`
      );
      setUserId(userId);
    };
    fetchData();
  }, []);

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
  };

  const handleChecking = (permissionName) => {
    return userData.permissions.includes(permissionName);
  };

  const update = async (e) => {
    e.preventDefault();
    const { data: response } = await axios.put(
      `http://localhost:8000/users/${userId}`,
      userData
    );
    console.log(response);

    const updatedUser = {
      id: userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      CreatedDate: userData.createdDate,
      sessionTimeOut: userData.sessionTimeOut,
    };
    const { data: user } = await axios.post(
      `http://localhost:8000/files/update-user/${userId}`,
      updatedUser
    );
    console.log(user);

    navigate(
      "/main/users/edit-user",
      { state: { user: { ...userData, ...updatedUser } } },
      { replace: true }
    );

    const { data: permissions } = await axios.post(
      `http://localhost:8000/files/update-permissions/${userId}`,
      {
        userId: userId,
        permissions: [...userData.permissions],
      }
    );
    console.log(permissions);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={update}>
        <Box>
          <Typography sx={{ mr: 1, display: "inline" }}>First Name:</Typography>
          <input
            type="text"
            value={userData.firstName}
            onChange={(e) => setUserData((u) => ({ ...u, firstName: e.target.value }))}
          />
        </Box>
        <Box>
          <Typography sx={{ mr: 1, display: "inline" }}>Last Name:</Typography>
          <input
            type="text"
            value={userData.lastName}
            onChange={(e) => setUserData((u) => ({ ...u, lastName: e.target.value }))}
          />
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography sx={{ mr: 1, display: "inline" }}>Username:</Typography>
          <input
            type="text"
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          />
        </Box>
        <Typography sx={{ mr: 1, display: "inline" }}>
          Created Date: <strong>{user.createdDate}</strong>
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography sx={{ mr: 1, display: "inline" }}>
            Session Time Out (in minuets):
          </Typography>
          <input
            type="number"
            value={userData.sessionTimeOut}
            onChange={(e) => setUserData({ ...userData, sessionTimeOut: e.target.value })}
          />
        </Box>
        <Typography variant="h5" sx={{ my: 2, fontWeight: 700 }}>
          Permissions:
        </Typography>
        {user.permissions == "Admin" && (
          <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
            Admin
          </Typography>
        )}
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>View Members</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("viewMembers")}
            disabled={isAdmin}
            name="viewMembers"
            id="viewMembers"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Create Members</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("createMembers")}
            disabled={isAdmin}
            name="createMembers"
            id="createMembers"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Update Members</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("updateMembers")}
            disabled={isAdmin}
            name="updateMembers"
            id="updateMembers"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Delete Members</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("deleteMembers")}
            disabled={isAdmin}
            name="deleteMembers"
            id="deleteMembers"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>View Movies</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("viewMovies")}
            disabled={isAdmin}
            name="viewMovies"
            id="viewMovies"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Create Movies</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("createMovies")}
            disabled={isAdmin}
            name="createMovies"
            id="createMovies"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Update Movies</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("updateMovies")}
            disabled={isAdmin}
            name="updateMovies"
            id="updateMovies"
            onChange={handleCheckbox}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 0 }}
        >
          <Typography sx={{ display: "inline" }}>Delete Movies</Typography>
          <input
            type="checkbox"
            checked={isAdmin || handleChecking("deleteMovies")}
            disabled={isAdmin}
            name="deleteMovies"
            id="deleteMovies"
            onChange={handleCheckbox}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <Button sx={{ mr: 2 }} variant="contained" type="submit">
              Update
            </Button>
            <Button onClick={() => navigate("/main/users/all-users")}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default EditUser;
