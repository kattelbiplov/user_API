const User = require('../models/user');
const jwt = require('jsonwebtoken')
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (user) return res.status(400).json({
                message: 'User is already registerd'
            });
            const {
                firstName,
                lastName,
                email,
                password,
                userName
            } = req.body;
            let _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString()
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Something went wrong'
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'user created successfully'
                    });
                }
            });
        });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) {
                console.log(error)
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({ _id: user._id }, ADMINSECRET, { expiresIn: '1h' });
                    const { firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName,

                        }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Invalid Password'
                    })
                }
            } else {
                return res.status(400).json({
                    message: 'something went wrong'
                })
            }
        })
}