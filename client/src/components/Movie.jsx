import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const Movie = ({ movie, isEditVisible, isDeleteVisible }) => {
  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const [moviesSubscriptions, setMoviesSubscriptions] = useState([]);
  const [members, setMembers] = useState([]);

  const deleteMovie = async () => {
    dispatch({ type: "DELETE_MOVIE", payload: movie._id });

    const { data: response } = await axios.delete(
      `http://localhost:8000/movies/${movie._id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);

    const { data: subscriptions } = await axios.get(
      "http://localhost:8000/subscriptions",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const newSubs = subscriptions.map((sub) => {
      return {
        _id: sub._id,
        memberId: sub.memberId,
        movies: sub.movies
          .filter((mov) => mov.movieId !== movie._id)
          .map(({ _id, ...rest }) => rest),
      };
    });

    newSubs.forEach(async (sub) => {
      const { _id, ...dataToSend } = sub;
      const { data: response } = await axios.put(
        `http://localhost:8000/subscriptions/${sub._id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    });
  };

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data: subscriptions } = await axios.get(
        "http://localhost:8000/subscriptions",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const filterByMovieId = (array, movieId) => {
        return array.filter((obj) =>
          obj.movies.some((movie) => movie.movieId === movieId)
        );
      };

      const movieSubscriptions = filterByMovieId(subscriptions, movie._id);

      setMoviesSubscriptions(movieSubscriptions);

      const { data: membersData } = await axios.get("http://localhost:8000/members", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMembers(membersData);
    };
    fetchSubscriptions();
  }, []);

  return (
    <div style={{ margin: "15px", padding: "15px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            textAlign: "center",
            color: "#000",
            width: { lg: "40vw", md: "50vw", sm: "60vw", xs: "80vw" },
            py: 1,
          }}
        >
          <CardHeader
            title={movie.name}
            subheader={movie.genres.map((genre) => `"${genre}"`).join(", ")}
          />
          <CardMedia
            sx={{ objectFit: "contain" }}
            component="img"
            image={movie.image}
            height={300}
          />
          <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                padding: 2,
                // border: "3px solid black",
                width: 300,
              }}
            >
              <Typography variant="subtitle1">Subscriptions Watched:</Typography>
              {moviesSubscriptions.map((movieObj) => {
                return (
                  <List key={movieObj._id}>
                    <ListItem sx={{ height: 40 }}>
                      <ListItemText
                        sx={{ textAlign: "center" }}
                        primary={
                          <a href="/main/subscriptions/all-members">
                            {members.find((m) => m._id === movieObj.memberId)?.name}
                          </a>
                        }
                        secondary={
                          movieObj.movies.find((mov) => mov.movieId === movie._id).date
                        }
                      />
                    </ListItem>
                  </List>
                );
              })}
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            {isEditVisible && (
              <Button
                variant="contained"
                onClick={() => navigate(`/main/movies/edit-movie/${movie._id}`)}
              >
                Edit
              </Button>
            )}
            {isDeleteVisible && (
              <Button
                sx={{ bgcolor: "background.default", "&:hover": { bgcolor: "#000" } }}
                variant="contained"
                onClick={deleteMovie}
              >
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default Movie;
