const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRoute } = require("./routers/user.routes");
const { authMiddleware } = require("./middleware/auth");
const { notesRoute } = require("./routers/notes.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ msg: "SERVER PAGE" });
});

app.use("/user", userRoute);
app.use(authMiddleware);
app.use("/notes", notesRoute);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`server is running at port ${process.env.PORT}`);
});
