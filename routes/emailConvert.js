const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const fetchConvertedText = require("../common/FetchConvertedText"); 
router.use(express.json());

router.post("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { data } = await db(
      `SELECT content FROM media WHERE id=${req.params.id};`
    );
    if (!data.length) {
      res.status(404).send("no media exists with this id");
    } else {
      let content = data[0].content;
      let requestBody = {
        content: content,
        fixation: 1,
        saccade: 10,
      };
      let convertedEmailText = await fetchConvertedText(requestBody);
      res.status(200).send(convertedEmailText);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
