const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

//GET shared
//----works in postman----//
//ex: http://localhost:5005/api/shared
/*
{
   "id": 1,
   "media_id": 1,
   "recipient_id": 2
},  
{
 "id": 2,
  "media_id": 1,
   "recipient_id": 3
 }
*/
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
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

//GET by recipient_id

//ex: http://localhost:5005/api/shared/1
/*
 {
   "id": 3,
    "media_id": 2,
    "recipient_id": 1
    },
  {
    "id": 4,
     "media_id": 2,
     "recipient_id": 1
   }
*/
//----works in postman----//
router.get(
  "/:recipient_id",
  userShouldBeLoggedIn,
  async function (req, res, next) {
    try {
      const { data } = await db(
        `SELECT * FROM shared WHERE recipient_id=${req.params.recipient_id};`
      );
      res.send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//GET by media id
//how do we account for multiple owner IDs in the media table?

router.get("/:media_id", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { data } = await db(
      // `SELECT * FROM shared WHERE id=${req.params.media_id};`
      `SELECT * FROM media INNER JOIN shared ON media.owner_id=shared.id;`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST shared
//----works in postman----//

router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
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
  userShouldBeLoggedIn,
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
