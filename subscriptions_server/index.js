const express = require("express");
const cors = require("cors");
const axios = require("axios");
const connectDB = require("./configs/subscriptions_db");

const membersRouter = require("./routers/membersRouter");
const moviesRouter = require("./routers/moviesRouter");
const subscriptionsRouter = require("./routers/subscriptionsRouter");

const { addMember, getAllMembers } = require("./BLL/membersBLL");
const { addMovie, getAllMovies } = require("./BLL/moviesBLL");

const Member = require("./models/membersModel");
const Movie = require("./models/moviesModel");

const RESET_DB = false;

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/members", membersRouter);
app.use("/movies", moviesRouter);
app.use("/subscriptions", subscriptionsRouter);

const ensureCollectionsExists = async () => {
  try {
    const membersWS = "https://jsonplaceholder.typicode.com/users";
    const moviesWS = "https://api.tvmaze.com/shows";

    const { data: members } = await axios.get(membersWS);
    const { data: movies } = await axios.get(moviesWS);

    if (RESET_DB) {
      await Member.deleteMany({});
      await Movie.deleteMany({});
    }

    const existingMembers = await getAllMembers();
    if (existingMembers.length === 0) {
      await Promise.all(
        members.map(async (member) => {
          return addMember({
            name: member.name,
            email: member.email,
            city: member.address.city,
          });
        })
      );
    }

    const existingMovies = await getAllMovies();
    if (existingMovies.length === 0) {
      await Promise.all(
        movies.map(async (movie) => {
          return addMovie({
            name: movie.name,
            genres: [...movie.genres],
            image: movie.image.medium,
            premiered: movie.premiered,
          });
        })
      );
    }
    console.log("Successfully added members and movies");
  } catch (error) {
    console.error(error);
  }
};

ensureCollectionsExists();
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
