require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const fetchConvertedText = require("../common/FetchConvertedText");

router.use(express.json());

router.post("/", async function (req, res, next) {
  let results = await fetchConvertedText(req.body);
  res.send(results);
});

module.exports = router;
