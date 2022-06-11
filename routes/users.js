const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

router.use(express.json())

//GET all users
//helpful for development, but comment out before deploying
router.get('/', function(req, res, next) {

});

//POST user (require first_name, last_name, username, password --> store password as hashed password using bcrypt)
router.post('/', function(req, res, next) {

})

//PUT: edit student
router.put('/:id', function(req, res, next){

})

//DELETE student
router.delete('/:id', function(req,res, next) {
  
})





module.exports = router;
