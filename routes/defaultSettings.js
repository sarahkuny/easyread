const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

//GET settings by username
router.get("/", userShouldBeLoggedIn, async function (req, res, next) {
  const username = req.username;
  try {
    const results = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const user = results.data[0];
    const { data } = await db(
      `SELECT * FROM default_settings WHERE user_id=${user.id};`
    );
    if (data.length) {
      res.status(200).send(data);
    } else {
      res.status(404).send("no settings found for user");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST settings
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  const { font_size, font_color, background_color, line_spacing } = req.body;
  const username = req.username;

  try {
    const results = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const user = results.data[0];
    await db(
      `INSERT INTO default_settings (user_id, font_size, font_color, background_color, line_spacing) VALUES (${user.id}, ${font_size}, "${font_color}", "${background_color}", ${line_spacing});`
    );
    const { data } = await db(
      `SELECT * FROM default_settings where user_id = ${user.id};`
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/", userShouldBeLoggedIn, async function (req, res, next) {
  const { font_size, font_color, background_color, line_spacing } = req.body;
  const username = req.username;

  try {
    const results = await db(
      `SELECT id FROM users WHERE username="${username}";`
    );
    const user = results.data[0];
    await db(
      `UPDATE default_settings SET font_size=${font_size}, font_color="${font_color}", background_color="${background_color}", line_spacing=${line_spacing} WHERE user_id=${user.id}`
    );
    const { data } = await db(
      `SELECT * FROM default_settings where user_id = ${user.id};`
    );
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete if user deletes account -feature extension
// router.delete("/:id", userShouldBeLoggedIn, function (req, res, next) {
//   db(`DELETE FROM default_settings WHERE id=${req.params.id};`)
//     .then((results) => res.send(results))
//     .catch((err) => res.status(500).send(err));
// });

module.exports = router;
