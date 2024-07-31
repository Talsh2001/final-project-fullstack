import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Typography, Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddMovie = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [newMovie, setNewMovie] = useState({});

  const accessToken = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();

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

      if (permissions.includes("Admin") || permissions.includes("createMovies")) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    fetchUserPermissions();
  }, []);

  const parseGenres = (genresString) => {
    const genresArray = genresString.split(/[\s,]+/).filter(Boolean);

    return genresArray;
  };

  const saveMovie = async () => {
    const updatedGenres = parseGenres(newMovie.genres);
    const updatedNewMovie = { ...newMovie, genres: updatedGenres };

    dispatch({ type: "ADD_MOVIE", payload: updatedNewMovie });

    const { data: response } = await axios.post(
      "http://localhost:8000/movies",
      updatedNewMovie,
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
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ mr: 1, display: "inline" }}>Name:</Typography>
          <input
            type="text"
            onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
          />
          <br />
          <Typography sx={{ mr: 1, display: "inline" }}>Genres:</Typography>
          <input
            type="text"
            onChange={(e) => setNewMovie({ ...newMovie, genres: e.target.value })}
          />
          <br />
          <Typography sx={{ mr: 1, display: "inline" }}>ImageUrl:</Typography>
          <input
            type="text"
            onChange={(e) => setNewMovie({ ...newMovie, image: e.target.value })}
          />
          <br />
          <Typography sx={{ mr: 1, display: "inline" }}>Premiered:</Typography>
          <input
            type="text"
            onChange={(e) => setNewMovie({ ...newMovie, premiered: e.target.value })}
          />
          <br /> <br />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button sx={{ mr: 2 }} variant="contained" onClick={saveMovie}>
                Save
              </Button>
              <Button onClick={() => navigate("/main/movies/all-movies")}>Cancel</Button>
            </Box>
          </Box>
        </Box>
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

export default AddMovie;
