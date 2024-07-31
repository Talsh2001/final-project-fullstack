import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { Box, Typography, Button } from "@mui/material";

const EditMovie = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });

  const accessToken = sessionStorage.getItem("accessToken");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(`http://localhost:8000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMovie(data);
    };
    fetchMovie();
  }, [id, accessToken]);

  const updateMovie = async () => {
    const parseGenres = (genresString) => {
      const genresArray = genresString.split(/[\s,]+/).filter(Boolean);

      return genresArray;
    };

    if (Array.isArray(movie.genres)) {
      dispatch({ type: "UPDATE_MOVIE", payload: movie });

      const { data: response } = await axios.put(
        `http://localhost:8000/movies/${id}`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } else {
      dispatch({ type: "UPDATE_MOVIE", payload: movie });

      const updatedGenres = parseGenres(movie.genres);
      const { data: response } = await axios.put(
        `http://localhost:8000/movies/${id}`,
        { ...movie, genres: updatedGenres },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    }
  };

  return (
    <>
      <Typography sx={{ my: 3, fontWeight: 600 }} variant="h5">
        Edit Movie: {movie.name}
      </Typography>
      <Typography sx={{ mr: 1, display: "inline" }}>Name:</Typography>
      <input
        type="text"
        value={movie.name}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      />
      <br />
      <Typography sx={{ mr: 1, display: "inline" }}>Genres:</Typography>
      <input
        type="text"
        value={movie.genres}
        onChange={(e) => setMovie({ ...movie, genres: e.target.value })}
      />
      <br />
      <Typography sx={{ mr: 1, display: "inline" }}>ImageUrl:</Typography>
      <input
        type="text"
        value={movie.image}
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
      />
      <br />
      <Typography sx={{ mr: 1, display: "inline" }}>Premiered:</Typography>
      <input
        type="text"
        value={movie.premiered}
        onChange={(e) => setMovie({ ...movie, premiered: e.target.value })}
      />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button sx={{ mr: 2 }} variant="contained" onClick={updateMovie}>
            Update
          </Button>
          <Button onClick={() => navigate("/main/movies/all-movies")}>Cancel</Button>
        </Box>
      </Box>
    </>
  );
};

export default EditMovie;
