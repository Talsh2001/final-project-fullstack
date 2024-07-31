const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/users_db");
const { requireAuth } = require("./middlewares/auth-middleware");

const usersRouter = require("./routers/usersRouter");
const membersRouter = require("./routers/membersRouter");
const moviesRouter = require("./routers/moviesRouter");
const subscriptionsRouter = require("./routers/subscriptionsRouter");
const filesRouter = require("./routers/filesRouter");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/users", usersRouter);
app.use("/files", filesRouter);

app.use("/members", requireAuth, membersRouter);
app.use("/movies", requireAuth, moviesRouter);
app.use("/subscriptions", requireAuth, subscriptionsRouter);

app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
