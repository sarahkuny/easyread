const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

//GET media
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const results = await db(`SELECT * FROM media;`);
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET by user
router.get("/user", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const username = req.username;
    const results = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const user = results.data[0];
    const { data } = await db(
      `SELECT * FROM media WHERE owner_id=${user.id};`
    );
   
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET media document by id
router.get("/document/:id", userShouldBeLoggedIn, async function (req, res, next) {
    try {
      const { data } = await db(
        `SELECT * FROM media WHERE id=${req.params.id};`
      );
      if (!data.length) {
        res.status(404).send("no media exists with this id");
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//POST media
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { name, content } = req.body;
    const username = req.username;
    let parsedContent = content.replaceAll(`"`, `''`);
    console.log(parsedContent)
    const { data } = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const owner = data[0];
    await db(
      `INSERT INTO media (owner_id, name, content) VALUES (${owner.id}, "${name}", "${parsedContent}");`
    );
    res.status(200).send("media added!");
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE media by media id
router.delete("/document/:id", userShouldBeLoggedIn, async function (req, res, next) {
    try {
      const username = req.username;
      const results = await db(
        `SELECT id FROM users WHERE username="${username}";`
      );
      const user = results.data[0];
      await db(`DELETE FROM media WHERE id=${req.params.id};`);
      const { data } = await db(`SELECT * FROM media where owner_id=${user.id};`);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }

    console.log("req.params", req.params);
  }
);


module.exports = router;
