require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  //port: 52000, //Docker
  password: DB_PASS,
  database: DB_NAME || "easyread",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  //create users table
  let sqlUsers =
    "DROP TABLE if exists users; CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) not null, last_name VARCHAR(255), username VARCHAR(40) not null, password VARCHAR(255) not null, PRIMARY KEY (id));";
  con.query(sqlUsers, function (err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");
  });
  //create default_settings table
  let sqlSettings =
    "DROP TABLE if exists default_settings; CREATE TABLE default_settings(id INT NOT NULL AUTO_INCREMENT, user_id INT, font_size INT not null, font_color VARCHAR(40) not null, background_color varchar(40) not null, line_spacing INT, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id));";
  con.query(sqlSettings, function (err, result) {
    if (err) throw err;
    console.log("Table creation `default_settings` was successful!");
  });

  let sqlMedia =
    "DROP TABLE if exists media; CREATE TABLE media(id INT NOT NULL AUTO_INCREMENT, owner_id INT not null, name VARCHAR(40) not null, file_type VARCHAR(40) not null, blob_url VARCHAR(255) not null, PRIMARY KEY (id), FOREIGN KEY () REFERENCES users(id));";

  con.query(sqlMedia, function (err, result) {
    if (err) throw err;
    console.log("Table creation `media` was successful!");
  });

  let sqlShared =
    "DROP TABLE if exists shared; CREATE TABLE shared(id INT NOT NULL AUTO_INCREMENT, media_id INT not null, recipient_id INT not null, PRIMARY KEY (id), FOREIGN KEY (recipient_id) REFERENCES users(id), FOREIGN KEY (media_id) REFERENCES media(id));";
  con.query(sqlShared, function (err, result) {
    if (err) throw err;
    console.log("Table creation `shared` was successful!");

    console.log("Closing...");
  });
  con.end();
});
