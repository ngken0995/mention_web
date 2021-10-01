const express = require('express'),
			passport = require('passport'),
			jwt = require('jsonwebtoken'),
			User = require('../db/User'),
			router = express.Router()

/* API entrypoints */
// Singup
router.post('/signup', (req, res) => {
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		keyword: ""
	})

	user.save().then(() => {

		// Token
		const token = jwt.sign({id: user.id}, 'jwt_secret')
		res.json({token: token})

	}).catch((err) => {
		res.status().json({})
	})
})

router.post('/updateUser', (req, res) => {
	var filter = {username: req.body.user}
	update = {
		keyword: req.body.keyword,
		email: req.body.email
	}
	
	User.findOneAndUpdate(filter, update)
	.then(() => {
		
	}).catch((err) => {
		res.status().json({})
	})
})

// Login
router.post('/login', passport.authenticate('local', {
	session: false
}), (req, res) => {

	// Token
	const token = jwt.sign({id: req.user.id}, 'jwt_secret')

	res.json({token: token})
})

// Return user information
router.get('/user', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	if ( !req.user ) {
		res.json({
			username: 'nobody'
		})
	}
	
	res.json({
		username: req.user.username,
		email: req.user.email,
		keyword: req.user.keyword
	})
})

module.exports = router
