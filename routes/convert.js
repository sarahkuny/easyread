require('dotenv').config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");


router.use(express.json());

router.get('/', function (req, res, next){
    res.send("route works")
})

router.post('/', async function (req, res, next){
    const { content, fixation, saccade } = req.body;
    const encodedParams = new URLSearchParams();
    encodedParams.append("content", `${content}`);
    encodedParams.append("response_type", "html");
    encodedParams.append("request_type", "html");
    encodedParams.append("fixation", `${fixation}`);
    encodedParams.append("saccade", `${saccade}`);
    const apiKey = process.env.API_KEY;
    
    const options = {
      method: 'POST',
      url: 'https://bionic-reading1.p.rapidapi.com/convert',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': `${apiKey}`,
        'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
      },
      data: encodedParams
    };
    
    try{
      let response = await axios.request(options);
      res.send(response.data);
    }
    
    catch (error) {
        console.error(error);
    };
    

});


module.exports = router;
