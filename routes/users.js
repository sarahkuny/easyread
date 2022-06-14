const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
router.use(express.json());

//GET all users
//helpful for development, but comment out before deploying
router.get('/', async function(req, res, next) {
   try{
    const { data } = await db(`SELECT * FROM users;`);
    if (data.length){
        res.status(200).send(data)
    } else {
        res.status(400).send("No users in database")
    }
   } catch (err) {
        res.status(400).send(err)
   }
});

//POST user (require first_name, last_name, username, password --> store password as hashed password using bcrypt)
router.post("/", function (req, res, next) {});

//PUT: edit student
router.put("/:id", function (req, res, next) {});

//DELETE student
router.delete("/:id", function (req, res, next) {});

module.exports = router;
