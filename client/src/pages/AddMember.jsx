import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Box, Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddMember = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [newMember, setNewMember] = useState({});

  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserPermissions = async () => {
      const { data: permissionsData } = await axios.get(
        "http://localhost:8000/files/read-permissions-file"
      );

      const { data: users } = await axios.get(
        "http://localhost:8000/files/read-users-file"
      );

      const fullName = sessionStorage.getItem("userFullName");

      const currentUser = users.users.find(
        (u) => u.firstName + " " + u.lastName === fullName
      );

      const userPermissions = permissionsData.permissions.find(
        (per) => per.userId === currentUser.id
      );

      const permissions = userPermissions.permissions;

      if (permissions.includes("Admin") || permissions.includes("createMembers")) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    fetchUserPermissions();
  }, []);

  const saveMember = async () => {
    dispatch({ type: "ADD_MEMBER", payload: newMember });
    const { data: response } = await axios.post(
      "http://localhost:8000/members",
      newMember,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
  };

  const isXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  let variant;
  if (isXs) variant = "h4";
  if (isSm) variant = "h2";
  if (isMd) variant = "h1";
  if (isLg) variant = "h1";

  return (
    <>
      {isVisible && (
        <>
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 3 }} variant="h5">
              Add New Member
            </Typography>
            <Typography sx={{ mr: 1, display: "inline" }}>Name:</Typography>
            <input
              type="text"
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <br />
            <Typography sx={{ mr: 1, display: "inline" }}>Email:</Typography>
            <input
              type="text"
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            />
            <br />
            <Typography sx={{ mr: 1, display: "inline" }}>City:</Typography>
            <input
              type="text"
              onChange={(e) => setNewMember({ ...newMember, city: e.target.value })}
            />
            <br /> <br />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button sx={{ mr: 2 }} variant="contained" onClick={saveMember}>
                  Save
                </Button>
                <Button onClick={() => navigate("/main/subscriptions/all-members")}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {!isVisible && (
        <Box>
          <Typography
            sx={{ color: "red", fontWeight: 600, mt: 5, textAlign: "center" }}
            variant={variant}
          >
            Not Authorized!
          </Typography>
        </Box>
      )}
    </>
  );
};

export default AddMember;
