const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const fetchConvertedText = require("../common/FetchConvertedText"); //method to call the bionic reading api
router.use(express.json());

/* POST request:

1. needs to be logged in -userShouldBeLoggedIn /
2. Query media table to find what text wants to be converted by using 
   document id  take the content and send to convert route
3. Save this in a variable
4. create a request body using the media content response
5. request body needs to be passed into fetch converted text
6. let results = await fetchConvertedText(req);
7. send results to front end - this is the email */

//check route

// router.get("/", userShouldBeLoggedIn, function (req, res, next) {
//   res.send("emailConvert route works");
// });

//check get request with id

// router.get("/:id", userShouldBeLoggedIn, async function (req, res, next) {
//   // router.get("/:owner_id", userShouldBeLoggedIn, async function (req, res, next) {

//   try {
//     const { data } = await db(`SELECT * FROM media WHERE id=${req.params.id};`);
//     if (!data.length) res.status(404).send("no media exists with this id");
//     else res.status(200).send(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.post("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { data } = await db(
      // `SELECT user_id, fixation, saccade FROM default_settings WHERE user_id=${req.params.id};` //create inner join
      `SELECT media.content, default_settings.fixation, default_settings.saccade FROM media INNER JOIN default_settings ON media.owner_id = default_settings.user_id AND media.owner_id = ${req.params.id};`
    );
    if (!data.length) res.status(404).send("no media exists with this id");
    else {
      // res.status(200).send(data[0].content);

      let results = data[0]; //Ellie's suggestion
      console.log("results", results);

      let convertedEmailText = fetchConvertedText(results);
      res.status(200).send(convertedEmailText);
    }
    // let ___ = await fetchConvertedText(req); ??
  } catch (err) {
    res.status(500).send(err);
  }
});

// const fetchConvertedText = require("../common/FetchConvertedText");
// // router.use(express.json());

// // POST request:
// // needs to be logged in
// // Query media table to find what text wants to be converted, take the content and send to convert route
// // Save this in a variable
// // create a request body using the media content response
// // request body needs to be passed into fetch converted text
// // let results = await fetchConvertedText(req);
// // send results to front end - this is the email

// router.post("/:id", userShouldBeLoggedIn, function (req, res, next) {
//   // // check item is in media table - saved in variable textExists
//   // const { textExists } = await db(
//   //   `SELECT * FROM media WHERE id=${req.params.id};`
//   // // send to convert route - saved in emailConvertedText variable
//   // if (textExists){
//   // const emailConvertedText = async (e) => {
//   //     e.preventDefault();
//   //     try{
//   //         const { data } = await axios('/api/convert', {
//   //             method: "POST",
//   //             data: {
//   //                 content: `${textExists}`
//   //             }
//   //         })
//   //     } catch (err){
//   //         setError(true);
//   //     }
//   // }}
// });

module.exports = router;
