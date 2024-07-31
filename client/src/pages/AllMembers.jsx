import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Member from "../components/Member";

import { Box, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AllMembers = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(true);
  const [isDeleteVisible, setIsDeleteVisible] = useState(true);

  const members = useSelector((state) => state.members);

  useEffect(() => {
    const fetchData = async () => {
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

      if (permissions.includes("Admin") || permissions.includes("viewMembers")) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setUnauthorized(true);
      }

      if (permissions.includes("Admin") || permissions.includes("updateMembers")) {
        setIsEditVisible(true);
      } else {
        setIsEditVisible(false);
      }

      if (permissions.includes("Admin") || permissions.includes("deleteMembers")) {
        setIsDeleteVisible(true);
      } else {
        setIsDeleteVisible(false);
      }
    };
    fetchData();
  }, []);

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
          {members.map((member) => {
            return (
              <Member
                key={member._id}
                member={member}
                isEditVisible={isEditVisible}
                isDeleteVisible={isDeleteVisible}
              />
            );
          })}
        </>
      )}
      {unauthorized && (
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

export default AllMembers;
