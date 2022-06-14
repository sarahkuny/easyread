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
        res.status(404).send("No users in database")
    }
   } catch (err) {
        res.status(500).send(err)
   }
});

//GET by id
router.get('/:id', async function (req, res, next){
    try{
        const { data } = await db(`SELECT * FROM users WHERE id=${req.params.id};`);
        res.status(200).send(data)
    } catch (err){
        res.status(500).send(err)
    }
})

//POST user (require first_name, last_name, username, password --> store password as hashed password using bcrypt)
router.post("/", async function (req, res, next) {
    const { username, password, first_name, last_name } = req.body;
    try{
        //check if username taken
        let { data } = await db(`SELECT username FROM users;`);
        let userExists = data.find((user) => (user.username === username));
        if (userExists) res.sendStatus(401);
        //if username available, create hashed password and store in users table
        if (userExists === undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db(`INSERT INTO users (username, password, first_name, last_name) VALUES ("${username}", "${hashedPassword}", "${first_name}", "${last_name}");`)
            res.status(200).send("user added");
        }
    } catch (err) {
        res.status(500).send(err)
    }
    
});

//PUT: edit student
router.put("/:id", function (req, res, next) {});

//DELETE student
router.delete("/:id", function (req, res, next) {});

module.exports = router;
