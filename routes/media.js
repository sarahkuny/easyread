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

//GET by owner id
router.get('/:id', function(req, res, next){

})

//POST media
router.post('/', async function(req, res, next){
    try{
        const { name, file_type, blob_url } = req.body;
        const username = req.username;
        const owner_id = await db(`SELECT id FROM users WHERE username="${username}";`)
        await db(`INSERT INTO media (owner_id, name, file_type, blob_url) VALUES ("${owner_id}", "${name}", "${file_type}", "${blob_url}");`)
    } catch(err) {
        res.status(500).send(err);
    }
   

})

//PUT media
//where we can change shared id
router.put('/', function(req, res, next){

})
//DELETE media
router.delete('/', function(req, res, next){

})

module.exports = router;
