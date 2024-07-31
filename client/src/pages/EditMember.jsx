import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";

const EditMember = () => {
  const members = useSelector((state) => state.members);

  const { id } = useParams();

  const member = members.find((mem) => mem._id === id);

  const [updatedMember, setUpdatedMember] = useState({
    name: member.name,
    email: member.email,
    city: member.city,
  });

  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const updateMember = async () => {
    dispatch({ type: "UPDATE_MEMBER", payload: { ...updatedMember, _id: id } });

    const { data: response } = await axios.put(
      `http://localhost:8000/members/${id}`,
      updatedMember,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
  };

  return (
    <>
      <Typography sx={{ my: 3, fontWeight: 700 }} variant="h5">
        Edit Member: {member.name}
      </Typography>
      <Typography sx={{ mr: 1, display: "inline" }}>Name:</Typography>
      <input
        type="text"
        value={updatedMember.name}
        onChange={(e) => setUpdatedMember({ ...updatedMember, name: e.target.value })}
      />
      <br />
      <Typography sx={{ mr: 1, display: "inline" }}>Email:</Typography>
      <input
        type="text"
        value={updatedMember.email}
        onChange={(e) => setUpdatedMember({ ...updatedMember, email: e.target.value })}
      />
      <br />
      <Typography sx={{ mr: 1, display: "inline" }}>City:</Typography>
      <input
        type="text"
        value={updatedMember.city}
        onChange={(e) => setUpdatedMember({ ...updatedMember, city: e.target.value })}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <Button sx={{ mr: 2 }} variant="contained" onClick={updateMember}>
            Update
          </Button>
          <Button onClick={() => navigate("/main/subscriptions/all-members")}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default EditMember;
