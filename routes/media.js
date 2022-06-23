const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

//GET media
router.get("/", async function (req, res, next) {
  // router.get("/", userShouldBeLoggedIn, async function (req, res, next) {

  try {
    const results = await db(`SELECT * FROM media;`);
    if (results.data.length) {
      res.status(200).send(results.data);
    } else {
      res.status(404).send("No media in database");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET by owner id
//example: http://localhost:5005/api/media/1
/*  {
        "id": 1,
        "owner_id": 1,
        "name": "Test Name",
        "file_type": "Test File",
        "blob_url": "www.test.com"
    }
*/
router.get("/:owner_id", async function (req, res, next) {
  // router.get("/:owner_id", userShouldBeLoggedIn, async function (req, res, next) {

  try {
    const { data } = await db(
      `SELECT * FROM media WHERE owner_id=${req.params.owner_id};`
    );
    if (!data.length) res.status(404).send("no media exists for this user");
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST media
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { name, content } = req.body;
    const username = req.username;
   
    const { data } = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const owner = data[0];
    await db(
      `INSERT INTO media (owner_id, name, content) VALUES (${owner.id}, "${name}", "${content}");`
    );
    res.status(200).send("media added!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE media by media id
router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  // router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {

  try {
    await db(`DELETE FROM shared WHERE media_id=${req.params.id};`);
    await db(`DELETE FROM media WHERE id=${req.params.id};`);
    const { data } = await db(`SELECT * FROM media;`);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
