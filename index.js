const express = require("express");
const { connection } = require("./config/db");
const app = express();
app.get("/", (req, res) => {
  res.status(200).send({ msg: "SERVER PAGE" });
});
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running at port ${process.env.PORT}`);
});
