const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

router.use(express.json())

//GET media
router.get('/', async function(req, res, next) {
    try{
        const results = await db(`SELECT * FROM media;`);
        if (results.data.length){
            res.status(200).send(results)
        } else {
            res.status(404).send("No media in database")
        }
    } catch (err){
        res.status(500).send(err)
    }
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

module.exports = router;
