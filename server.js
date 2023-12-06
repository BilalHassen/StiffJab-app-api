const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

require("dotenv").config();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the boxing-app server");
});

app.listen(PORT, () => {
  console.log(`app is running or ${PORT}`);
});
