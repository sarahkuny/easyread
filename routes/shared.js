const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

//GET shared
//----works in postman----//
router.get("/", async function (req, res, next) {
  try {
    const results = await db(`SELECT * FROM shared;`);
    if (results.data.length) {
      res.status(200).send(results);
    } else {
      res.status(404).send("No results in database");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET by recipient id
//----works in postman----//
router.get("/:recipient_id", async function (req, res, next) {
  try {
    const { data } = await db(
      `SELECT * FROM shared WHERE recipient_id=${req.params.recipient_id};`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET by owner id
//how do we account for multiple owner IDs in the media table?
router.get("/:owner_id", async function (req, res, next) {
  try {
    const { data } = await db(
      `SELECT * FROM media WHERE id=${req.params.owner_id};`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST shared
//----works in postman----//
router.post("/", async function (req, res, next) {
  // router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { media_id, recipient_id } = req.body;
    const username = req.username;
    await db(`SELECT id FROM users WHERE username="${username}";`);
    const { data } = await db(
      `INSERT INTO shared (media_id, recipient_id) VALUES (${media_id}, "${recipient_id}");`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE media by id
router.delete(
  "/:owner_id",
  //   userShouldBeLoggedIn,
  async function (req, res, next) {
    try {
      await db(`DELETE FROM media WHERE owner_id=${req.params.owner_id};`);
      const { data } = await db(`SELECT * FROM media;`);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//PUT media
//where we can change shared id
// router.put("/:owner_id", userShouldBeLoggedIn, async function (req, res, next) {
//   try {
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
