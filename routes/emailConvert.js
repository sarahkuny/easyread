const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

const fetchConvertedText = require("../common/FetchConvertedText"); //method to call the bionic reading api
router.use(express.json());

router.post("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { data } = await db(
      `SELECT content FROM media WHERE id=${req.params.id};`
    );
    if (!data.length) {
      res.status(404).send("no media exists with this id");
    } else {
      let results = data[0];

      console.log("results", results.content);
      let requestBody = {
        content: results.content,
        fixation: 1,
        saccade: 10,
      };

      console.log("requestBody", requestBody);

      let convertedEmailText = await fetchConvertedText(requestBody);

      console.log("convertedEmailText", convertedEmailText);

      res.status(200).send(convertedEmailText);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
