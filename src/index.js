const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require('body-parser')
require("dotenv/config");
const { clientOrigins, serverPort } = require("./config/env.dev");

app.use(bodyParser.json())
app.use(helmet());
app.use(cors({ origin: clientOrigins }));

//IMPORT ROUTES

const libraryPosts = require('./routes/library')

app.use('/library', libraryPosts)

app.get("/", (req, res) => {
  res.send("We are running");
});



//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {useNewUrlParser: true},
  () => console.log("connected to db")
);

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);

