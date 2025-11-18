require("dotenv").config();
const express = require("express");
const app = express();

const { PORT } = require("./util/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const { connectToDatabase } = require("./util/db");
const errorHandler = require("./middleware/errorHandler");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
// JSON parser with error handling for empty/invalid bodies
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    // If JSON parsing fails and body is empty/whitespace, treat as empty object
    if (err && err.type === "entity.parse.failed") {
      req.body = {};
      return next();
    }
    next(err);
  });
});
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
