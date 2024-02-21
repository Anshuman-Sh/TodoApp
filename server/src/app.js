const express = require("express");
const router = require("./routes/index");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkForAuth } = require("./middlewares/authentication");

//Parse data
app.use(express.json());

//Enable cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//CookieParser
app.use(cookieParser());

//Authentication
app.use(checkForAuth("token"));

//Routes
app.use("/", router);

module.exports = app;
