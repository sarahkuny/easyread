var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const defaultSettingsRouter = require("./routes/defaultSettings");
const usersRouter = require("./routes/users");
const mediaRouter = require("./routes/media");
const convertRouter = require("./routes/convert");
const emailConvert = require("./routes/emailConvert");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));



app.use("/api/defaultSettings", defaultSettingsRouter);
app.use("/api/users", usersRouter);
app.use("/api/media", mediaRouter);
app.use("/api/convert", convertRouter);
app.use("/api/emailConvert", emailConvert);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
