import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  CardActions,
  Button,
  List,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Member = ({ member, isEditVisible, isDeleteVisible }) => {
  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);

  const memberSubscriptions = subscriptions.find((sub) => sub.memberId === member._id);

  const accessToken = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();

  const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  const [newMovieDiv, setNewMovieDiv] = useState(false);
  const [date, setDate] = useState(currentDate);

  const newMovies = movies.filter(
    (m) => !memberSubscriptions?.movies.some((subMovie) => subMovie.movieId === m._id)
  );

  const [movieName, setMovieName] = useState(newMovies[0].name);

  const currentMovie = movies.find((m) => m.name === movieName);

  const dispatch = useDispatch();

  const subscribe = async () => {
    if (memberSubscriptions) {
      const newMovies = [
        ...memberSubscriptions.movies,
        { movieId: currentMovie._id, date: date },
      ];

      dispatch({
        type: "UPDATE_SUBSCRIPTION_MOVIES",
        payload: { subscriptionId: memberSubscriptions._id, newMovies: newMovies },
      });

      const { data } = await axios.put(
        `http://localhost:8000/subscriptions/${memberSubscriptions._id}`,
        { movies: newMovies },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(data);
    } else {
      const obj = {
        memberId: member._id,
        movies: [{ movieId: currentMovie._id, date: date }],
      };

      dispatch({ type: "ADD_SUBSCRIPTION", payload: obj });

      const { data } = await axios.post("http://localhost:8000/subscriptions", obj, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);
    }
  };

  const deleteMember = async () => {
    dispatch({ type: "DELETE_MEMBER", payload: member._id });

    const { data: response } = await axios.delete(
      `http://localhost:8000/members/${member._id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);

    if (memberSubscriptions) {
      dispatch({ type: "DELETE_SUBSCRIPTION", payload: memberSubscriptions._id });

      const { data: response } = await axios.delete(
        `http://localhost:8000/subscriptions/${memberSubscriptions._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    }
  };

  const CustomCardHeader = ({ title, subheaders }) => {
    return (
      <Box>
        <Typography variant="h6">{title}</Typography>
        {subheaders.map((subheader, index) => (
          <Typography
            sx={{ fontSize: { xs: 12, sm: 14 } }}
            key={index}
            variant="subtitle1"
            color="textSecondary"
          >
            {subheader}
          </Typography>
        ))}
      </Box>
    );
  };

  const isXsAndNotSm =
    useMediaQuery((theme) => theme.breakpoints.up("xs")) &&
    !useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          minWidth: { lg: "530px", sm: "480px", xs: "90%" },
          maxWidth: { lg: "630px", sm: "580px", xs: "90%" },
          margin: 5,
          padding: 2,
          color: "background.default",
        }}
      >
        <CardHeader
          action={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "88px",
                ml: { xs: 2, sm: 0 },
              }}
            >
              {isEditVisible && (
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/main/subscriptions/edit-member/${member._id}`, {
                      replace: true,
                    })
                  }
                >
                  Edit
                </Button>
              )}
              {isDeleteVisible && (
                <Button
                  sx={{
                    bgcolor: "background.default",
                    "&:hover": { bgcolor: "#000" },
                  }}
                  variant="contained"
                  onClick={deleteMember}
                >
                  Delete
                </Button>
              )}
            </Box>
          }
          title={
            <CustomCardHeader
              title={member.name}
              subheaders={[`Email: ${member.email}`, `City: ${member.city}`]}
            />
          }
        />
        <CardContent>
          <div
            style={{
              border: "3px solid black",
              padding: "10px",
              margin: "15px",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mt: 1 }}>
              Movies Watched
            </Typography>

            {newMovieDiv && (
              <Box
                sx={{
                  py: 2,
                  width: "100%",
                  bgcolor: "primary.light",
                  borderRadius: 10,
                  mt: 2,
                  mb: 1,
                }}
              >
                <Typography variant="h5">Add a new movie</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "16vh",
                  }}
                >
                  <Select
                    sx={{
                      width: "70%",
                      "& .MuiInputBase-input": { padding: 1 },
                    }}
                    name="movies"
                    id="movies"
                    defaultValue={newMovies[0].name}
                    onChange={(e) => setMovieName(e.target.value)}
                  >
                    {newMovies.map((newMovie) => {
                      return (
                        <MenuItem key={newMovie._id} value={newMovie.name}>
                          {newMovie.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Box>
                <Button
                  sx={{ bgcolor: "background.default", "&:hover": { bgcolor: "#000" } }}
                  variant="contained"
                  onClick={subscribe}
                >
                  Subscribe
                </Button>
              </Box>
            )}
            {memberSubscriptions?.movies.map((movie) => {
              const movieData = movies.find(
                (movieData) => movieData._id === movie.movieId
              );
              return movieData ? (
                <List key={movie.movieId}>
                  <span
                    onClick={() =>
                      navigate(
                        "/main/movies/all-movies",
                        {
                          state: { movieName: movieData.name },
                        },
                        { replace: true }
                      )
                    }
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                      marginRight: 7,
                    }}
                  >
                    {movieData.name}
                  </span>
                  {isXsAndNotSm && <br />} {movie.date}{" "}
                </List>
              ) : null;
            })}
          </div>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => setNewMovieDiv(!newMovieDiv)}>
            Subscribe to a new movie
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Member;
