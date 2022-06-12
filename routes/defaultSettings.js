const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn")

router.use(express.json())


//GET settings by user_id 
router.get('/:id', function(req, res, next) {
  
});

//POST settings 
//(require user_id (foreign key from users table),font_size, font_color, background_color, line_spacing)
router.post('/', function(req, res, next) {

})

//PUT: edit settings
router.put('/:id', function(req, res, next){

})

//DELETE settings (set back to app default)
router.delete('/:id', function(req,res, next) {
  
})





module.exports = router;