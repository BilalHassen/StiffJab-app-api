const express = require("express");
const router = express.Router();

const fs = require("fs");

const newUserId = require("uniqid");

router.use(express.json());

function readUserData() {
  const userDataFile = fs.readFileSync("./data/userData.json");
  const userData = JSON.parse(userDataFile);
  return userData;
}

function readDefaultData() {
  const userDataFile = fs.readFileSync("./data/userData.json");
  const userData = JSON.parse(userDataFile);
  return userData;
}

function postUserData(data) {
  const formattedData = JSON.stringify(data);
  fs.writeFileSync("./data/userData.json", formattedData);
}

router.get("/", (req, res) => {
  const userData = readDefaultData();
  console.log({ userData });
  res.send(userData);
});

router.post("/", (req, res) => {
  //store the first array in a userdata variable
  const userData = readUserData();
  console.log(userData);
  // new user object to be added to the data file
  const newUser = {
    id: newUserId(),
    name: req.body.name,
    email: req.body.email,
    weight: req.body.weightClass,
    location: req.body.location,
    experience: req.body.experience,
  };
  // add the new user from the front end to the data file
  userData[0].push(newUser);
  // change the sent over data to a js object
  // and write it to the data file
  postUserData(userData);

  res.status(201).json(newUser);
});

module.exports = router;
