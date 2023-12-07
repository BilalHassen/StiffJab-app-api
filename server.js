const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const userDataRoutes = require("./routes/user");

require("dotenv").config();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

app.use("/userdata", userDataRoutes);

app.get("/", (req, res) => {
  res.send("welcome to the boxing-app server");
});

app.listen(PORT, () => {
  console.log(`app is running or ${PORT}`);
});
