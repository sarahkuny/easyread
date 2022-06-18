const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

router.use(express.json());

router.get("/", function (req, res, next) {
  res.send("works")
});
//GET settings by user_id
router.get("/:id", userShouldBeLoggedIn, function (req, res, next) {
  db(`SELECT * FROM default_settings WHERE id=${req.params.id};`)
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err));
});

//POST settings
//(require user_id (foreign key from users table),font_size, font_color, background_color, line_spacing)
// Do I put the inner join here? or is it in users table
// "id": 1, "user_id": 1, "font_size":14, "font_color": "black", "background_color": "purple", "line_spacing": 2
router.post("/", userShouldBeLoggedIn, function (req, res, next) {
  db(
    `INSERT INTO default_settings (require user_id (foreign key from users table), font_size, font_color, 
    background_color, line_spacing) VALUES ("${req.body.user_id}", "${req.body.font_size}", "${req.body.font_color}", 
     "${req.body.background_color}", "${req.body.line_spacing}");`
  )
    .then((results) => res.send(results.data))
    .catch((err) => res.status(500).send(err.message));
});

//PUT: edit settings
//user_id, font_size, font_color, background_color, line_spacing
// https://faridho.gitbooks.io/create-rest-api-by-node-js-express-js-and-mysql/content/put-method.html
router.put("/:id", userShouldBeLoggedIn, function (req, res, next) {
  const sql =
    'UPDATE default_settings SET user_id = ?, font_size = ?, font_color = ?, background_color = ? line_spacing = ? WHERE id="' +
    req.body.id +
    '"';
  const body = [
    req.body.user_id,
    req.body.font_size,
    req.body.font_color,
    req.body.background_color,
    req.body.line_spacing,
  ];
  con.query(sql, body, function (err) {
    if (err) {
      res.json({ Error: true, Message: "Error execute sql" });
    } else {
      res.json({ Error: false, Message: "Success" });
    }
  });
});

//DELETE settings (set back to app default)
router.delete("/:id", userShouldBeLoggedIn, function (req, res, next) {
  db(`DELETE FROM default_settings WHERE id=${req.params.id};`)
    .then((results) => res.send(results))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
