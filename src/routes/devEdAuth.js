const router = require("express").Router();
const User = require("../models/User");
const {registerValidation, loginValidation} = require("../devEdValidation");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");
router.post("/register", async (req, res) => {
  //Validate Data
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if duplicate user

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists)
    return res.status(400).send("An account already exists with that email");

  //Hash Password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({user: user.name});
  } catch (err) {
    res.status(400).send(error.details[0].message);
  }
});

//Login

router.post("/login", async (req, res) => {
  //Validate Data
  const {error} = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if duplicate user
  const user = await User.findOne({email: req.body.email});
  if (!user)
    return res
      .status(400)
      .send("We don't show an account registered to that email address");
  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

//Create and assign a token
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header('auth-token', res.send(token))

  
});

module.exports = router;
