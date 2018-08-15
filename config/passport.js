
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
//const User = require('../models/user');
const config = require('./main')


module.exports =  (passport) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret //normally store this in process.env.secret
  
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.username === "chiscript.com") {
        return done(null, true)
    }
    return done(null, false)
})
)}