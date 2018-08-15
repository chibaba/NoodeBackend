
const express = require("express");
const app = express();
const passport = require('passport');
const config = require('../config/main')

const jwt = require("jsonwebtoken");




app.get('/', (req, res) => {
  res.send('Welcome to home page')
})

app.post("/login", (req, res) => {
  let { username, password } = req.body;
  //This lookup would normally be done using a database
  if (email === "chiscript.com") {
      if (password === "pass") { //the password compare would normally be done using bcrypt.
          const opts = {}
          opts.expiresIn = 1000;  //token expires in 
          const secret = config.secret //normally stored in process.env.secret
          const token = jwt.sign({ username }, secret, opts);
          return res.status(200).json({
              message: "Auth Passed",
              token
          })
      }
  }
  return res.status(401).json({ message: "Auth Failed" })
});

app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.status(200).send("YAY! this is a protected Route")
})