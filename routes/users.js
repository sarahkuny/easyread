require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
router.use(express.json());

//GET all users
//helpful for development, but comment out before deploying
// router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
//   try {
//     const { data } = await db(`SELECT * FROM users;`);
//     if (data.length) {
//       res.status(200).send(data);
//     } else {
//       res.status(404).send("No users in database");
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//GET by id
router.get("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { data } = await db(`SELECT * FROM users WHERE id=${req.params.id};`);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST user (require first_name, last_name, username, password --> store password as hashed password using bcrypt)
router.post("/", async function (req, res, next) {
  const { username, password, first_name, last_name } = req.body;
  try {
    //check if username taken
    let { data } = await db(`SELECT username FROM users;`);
    let userExists = data.find((user) => user.username === username);
    if (userExists) res.sendStatus(401);
    //if username available, create hashed password and store in users table
    if (userExists === undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db(
        `INSERT INTO users (username, password, first_name, last_name) VALUES ("${username}", "${hashedPassword}", "${first_name}", "${last_name}");`
      );
      res.status(200).send("user added");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE user
router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    await db(`DELETE FROM users WHERE id=${req.params.id};`);
    res.status(200).send("user deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

//login, receive jwt
router.post("/login", async function (req, res, next) {
  const { username, password } = req.body;
  try {
    //select user info from users table
    const results = await db(
      `SELECT * FROM users WHERE username="${username}";`
    );
    const user = results.data[0];

    //if user exists
    if (user) {
      //compare input password with stored hashed password
      const correctPassword = await bcrypt.compare(password, user.password);

      //return error if password incorrect
      if (!correctPassword) return res.sendStatus(401);

      //send back token
      var token = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
      res.send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
