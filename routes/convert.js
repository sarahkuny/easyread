require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const fetchConvertedText = require("../common/FetchConvertedText");

router.use(express.json());

router.get("/", function (req, res, next) {
  res.send("route works");
});

router.post("/", async function (req, res, next) {
  let results = await fetchConvertedText(req);
  console.log(results);
  res.send(results);
});

module.exports = router;
