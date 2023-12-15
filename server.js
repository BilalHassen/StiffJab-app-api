const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const userDataRoutes = require("./routes/user");
const sendEmailRoutes = require("./routes/send-email");

require("dotenv").config();
const { PORT } = process.env || 5050;

app.use(cors());
app.use(express.json());

app.use("/send-email", sendEmailRoutes);

app.use("/userdata", userDataRoutes);

app.get("/", (req, res) => {
  res.send("welcome to the boxing-app server");
});

app.listen(PORT, () => {
  console.log(`app is running or ${PORT}`);
});
