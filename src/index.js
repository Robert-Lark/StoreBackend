const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const bodyParser = require('body-parser')
require("dotenv/config");
const { clientOrigins } = require("./config/env.dev");
const PORT = process.env.PORT || 6060
app.use(bodyParser.json())
app.use(helmet());
app.use(cors({ origin: clientOrigins }));

//IMPORT ROUTES

const libraryPosts = require('./routes/library')
app.use('/library', libraryPosts)

app.get("/", (req, res) => {
  res.send("We are running");
});

//Middleware
app.use(express.json());

//import routes
const postRoute = require('./routes/devEdLibrary')
const authRoute = require("./routes/devEdAuth");

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//route middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

app.listen(PORT, () =>
  console.log(`API Server listening on port ${PORT}`)
);

