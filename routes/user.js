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
  // console.log({ userData });
  res.send(userData);
});

router.post("/", (req, res) => {
  //store the first array in a userdata variable
  const userData = readUserData();
  // console.log(userData);
  // new user object to be added to the data file
  const newUser = {
    id: newUserId(),
    name: req.body.name,
    email: req.body.email,
    weight: req.body.weightClass,
    location: req.body.location,
    experience: req.body.experience,
  };

  // checks if the user already exists in the data
  // based on the provided email
  let existingUser = userData[0].find((user) => user.email === newUser.email);

  if (existingUser) {
    // sends a 200 the request has succeeded
    res.status(200).json(existingUser);
  } else {
    // add the new user from the front end to the data file
    userData[0].push(newUser);
    // change the sent over data to a js object
    // and write it to the data file
    postUserData(userData);

    // send a 201 indicating the success and creation of a user
    res.status(201).json(newUser);
  }
});

router.get("/:id", (req, res) => {
  // use req.params to get the id from the url parameter
  const { id } = req.params;

  // assign data to the user data variable
  let userData = readUserData();

  //extract only the user data from the entire data file and assign it to users
  let users = userData[0];

  // find the new user id from the user data
  let newUser = users.find((user) => user.id === id);

  // filter opponents based weight and experience
  let opponent = users.filter(
    (opponent) =>
      opponent.weight === newUser.weight &&
      opponent.experience === newUser.experience
  );
  // filter out the new user
  // so they wont have themselves as an opponent
  let filteredOpponent = opponent.filter(
    (opponent) => opponent.id !== newUser.id
  );

  res.json(filteredOpponent);
});

module.exports = router;
