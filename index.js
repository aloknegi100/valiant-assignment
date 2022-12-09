const express = require("express");
const router = require("./routes/index");
const path = require("path");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.use(cookieParser());
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.urlencoded());
app.use(router);

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening on port : 8000");
});
