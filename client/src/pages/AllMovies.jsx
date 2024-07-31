import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Movie from "../components/Movie";

import { Box, Typography, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AllMovies = () => {
  const movies = useSelector((state) => state.movies);

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState("");
  const [isDeleteVisible, setIsDeleteVisible] = useState("");
  const [findText, setFindText] = useState("");

  const accessToken = sessionStorage.getItem("accessToken");

  const location = useLocation();
  const movieName = location.state?.movieName;

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

      if (permissions.includes("Admin") || permissions.includes("viewMovies")) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setUnauthorized(true);
      }

      if (permissions.includes("Admin") || permissions.includes("updateMovies")) {
        setIsEditVisible(true);
      } else {
        setIsEditVisible(false);
      }

      if (permissions.includes("Admin") || permissions.includes("deleteMovies")) {
        setIsDeleteVisible(true);
      } else {
        setIsDeleteVisible(false);
      }
    };
    fetchUserPermissions();
  }, []);

  const findMovies = async (searchText) => {
    const { data: moviesDB } = await axios.get("http://localhost:8000/movies", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const filteredMovies = moviesDB.filter((movie) => movie.name.includes(searchText));

    dispatch({ type: "REPLACE_MOVIES_FIND", payload: filteredMovies });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      if (movieName) {
        setFindText(movieName);
        await findMovies(movieName);
      }
    };
    fetchMovie();
  }, [movieName]);

  const isXs = useMediaQuery((theme) => theme.breakpoints.up("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isLg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const isXsAndNotSm =
    useMediaQuery((theme) => theme.breakpoints.up("xs")) &&
    !useMediaQuery((theme) => theme.breakpoints.up("sm"));

  let variant;
  if (isXs) variant = "h4";
  if (isSm) variant = "h2";
  if (isMd) variant = "h1";
  if (isLg) variant = "h1";

  return (
    <>
      <Box sx={{ display: "inline", ml: 1, position: "relative", top: 2.5 }}>
        {isXsAndNotSm && <br />}
        <Typography variant="body1" sx={{ display: "inline", fontSize: 20 }}>
          Find Movie:{" "}
        </Typography>
        <TextField
          InputProps={{
            sx: {
              bgcolor: "#FFF",
              height: 25,
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
                borderWidth: 2,
              },
              "& .MuiOutlinedInput-input": {
                width: { xs: 140, sm: 150, md: 200 },
                padding: 0,
              },
              "& .MuiInputBase-input": {
                padding: 0,
                paddingLeft: "4px",
                color: "#000",
              },
              position: "relative",
              top: 4,
            },
          }}
          InputLabelProps={{
            sx: {
              lineHeight: 20,
            },
          }}
          type="text"
          onChange={(e) => setFindText(e.target.value)}
        />
        <Button
          sx={{
            p: 0,
            minWidth: 45,
            "&:hover": { bgcolor: "#000" },
            ml: 1,
            position: "relative",
            bottom: { md: 2, xs: 1 },
          }}
          size="small"
          variant="contained"
          onClick={() => findMovies(findText)}
        >
          Find
        </Button>
      </Box>
      {isVisible && (
        <Box>
          {movies.map((movie) => {
            return (
              <Movie
                key={movie._id}
                movie={movie}
                isEditVisible={isEditVisible}
                isDeleteVisible={isDeleteVisible}
              />
            );
          })}
        </Box>
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

export default AllMovies;
