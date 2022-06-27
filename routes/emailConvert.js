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
      `SELECT content FROM media WHERE id=${req.params.id};` /* -original*/
      // `SELECT m.content, d.fixation, d.saccade AS convert_text FROM media m JOIN default_settings d ON m.owner_id = d.user_id AND m.id=${req.params.id};` //Shubhra's suggestion
      // `SELECT media.content FROM media JOIN default_settings ON media.owner_id = default_settings.user_id AND media.id=1;`
    );
    if (!data.length) {
      res.status(404).send("no media exists with this id");
    } else {
      // res.status(200).send(data[0].content);

      let results = data[0];

      console.log("results", results.content); //results should return content, fixation, saccade (FetchCovertedText.js)
      let requestBody = {
        content: results.content,
        fixation: 1,
        saccade: 10,
      };

      console.log("requestBody", requestBody);

      let convertedEmailText = await fetchConvertedText(requestBody);
      //converting results to bionic reading
      //with the fetchConvertedText function
      // which is saved as convertedEmailText variable
      console.log("convertedEmailText", convertedEmailText);

      res.status(200).send(convertedEmailText);
      //sending variable convertedEmailText back as the final result of the post
    }
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
