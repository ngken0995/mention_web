const passport = require('passport')
const passportJWT = require("passport-jwt")
const Strategy = require('passport-local').Strategy
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const User = require('../db/User')
const bcrypt = require('bcrypt')

// Local Strategy
passport.use(new Strategy( (username, password, done) => {
	User.findOne({username: username}, (err, user) => {

		// If any error
    	if (err) { return done(err) }

		if (!user) {
			return done(null, false, {
				message: 'No user found.'
			})
		}

		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) throw err;
			if (isMatch) {
			  return done(null, user);
			} else {
			  return done(null, false, { message: 'Password incorrect' });
			}
		  });
	})
}))

// JWT
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'jwt_secret'
}, (jwt_payload, done) => {
	User.findById(jwt_payload.id).then(user => {
		return done(null, user)
	}).catch(err => {
		return done(err, false, {
			message: 'Token not matched.'
		})
	})
}))

module.exports = passport
