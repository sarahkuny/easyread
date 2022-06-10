const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

//GET media
router.get('/', userShouldBeLoggedIn, function(req, res, next) {

})

//GET by id
router.get('/:id', userShouldBeLoggedIn, function(req, res, next){

})

//POST media
router.post('/', userShouldBeLoggedIn, function(req, res, next){

})

//PUT media
router.put('/', userShouldBeLoggedIn, function(req, res, next){

})
//DELETE media
router.delete('/', userShouldBeLoggedIn, function(req, res, next){

})