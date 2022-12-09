const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/vcl");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to database"));
db.once("open", function () {
  console.log("Connected to database :: Mongodb");
});
module.exports = db;
