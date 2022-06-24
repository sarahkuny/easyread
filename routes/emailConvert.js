const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const fetchConvertedText = require("../common/fetchConvertedText");
// router.use(express.json());

// POST request:
// needs to be logged in
// Query media table to find what text wants to be converted, take the content and send to convert route
// Save this in a variable
// create a request body using the media content response
// request body needs to be passed into fetch converted text
// let results = await fetchConvertedText(req);
// send results to front end - this is the email

router.post("/:id", userShouldBeLoggedIn, function (req, res, next) {
  // // check item is in media table - saved in variable textExists
  // const { textExists } = await db(
  //   `SELECT * FROM media WHERE id=${req.params.id};`
  // // send to convert route - saved in emailConvertedText variable
  // if (textExists){
  // const emailConvertedText = async (e) => {
  //     e.preventDefault();
  //     try{
  //         const { data } = await axios('/api/convert', {
  //             method: "POST",
  //             data: {
  //                 content: `${textExists}`
  //             }
  //         })
  //     } catch (err){
  //         setError(true);
  //     }
  // }}
});

module.exports = router;
