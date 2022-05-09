const mongoose = require('mongoose');
require('../models/auth-model');
const User = mongoose.model('user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pradeepbagga.delhi@gmail.com',
        pass: 'guulcmsgrfizsamo'
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.signup = (req, res) => {
    console.log("SIGNUP -  ", req.body);
    const { name, email, password } = req.body;
    User.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: "This email is already exists." })
            }
            const token = jwt.sign({ name, email, password }, process.env.JWTSECURITY, { expiresIn: '10m' });
            const activateUrl = process.env.LOCALHOST + '/activate-account/' + token;
            const mailOptions = {
                from: 'pradeepbagga.delhi@gmail.com',
                to: email,
                subject: 'Account Activate',
                html: `Please <a href="${activateUrl}">click here</a> to activate your account`
            };
            res.json({ message: "Please check your e-mail to activate account." })
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("User signup email error -", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch((error) => {
            console.log("User Signup findone error - ", error)
        })
}

exports.activateAccount = (req, res) => {
    console.log("ACCOUNT ACTIVATE - ", req.body);
    const { token } = req.body;
    jwt.verify(token, process.env.JWTSECURITY, function (err, decode) {
        if (err) {
            console.log("Token verification ERROR - ", err);
            return res.status(400).json({ error: "Account Activation link has been expred Please Signup again." })
        }
        console.log("TOKEN DECODE -  ", decode);
        const { name, email, password } = decode;
        bcrypt.hash(password, 12, function (err, hashPassword) {
            if (err) {
                console.log("Password hash Error -", err);
                return;
            }
            const user = new User({
                name,
                email,
                password: hashPassword
            });
            user.save()
                .then((newUser) => {
                    console.log("NEW USER SAVED - ", newUser);
                    return res.status(200).json({ message: "User account has been activate. Please Signin." });
                })
        })
    })
}

exports.signin = (req, res) => {
    console.log("SIGN IN - ", req.body);
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(422).json({ error: "E-mail or Password is not valid." })
            }
            console.log("USER - ", user);
            bcrypt.compare(password, user.password, function (err, userData) {
                if (err) {
                    return res.status(422).json({ error: "E-mail or Password is not valid." })
                }
                if (!userData) {
                    return res.status(422).json({ error: "E-mail or Password is not valid." })
                }
                console.log("USER DATA - ", userData);
                const token = jwt.sign({ _id: user._id }, process.env.JWTSECURITY);
                return res.json({ token: token, user: { _id: user._id, email: user.email, name: user.name, userphoto: user.userphoto, gender: user.gender, following: user.following, followers: user.followers } })
            })
        })
}

exports.signinGoogle = (req, res) => {
    console.log("GOOGLE SIGNIN ", req.body);
    const { name, email } = req.body;
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.log("GOOGLE SIGNIN FIND USER ERROR ", err);
        }
        console.log("GOOGLE SIGNIN FIND USER ", user);
        if (user) {
            if (user.provider === null) {
                return res.status(422).json({ error: "This user is registerd with E-mail and password." })
            }
            if (user.provider === "facebook") {
                return res.status(422).json({ error: "This user is registerd with Facebook." })
            }
            if (user.provider === "google") {
                const token = jwt.sign({ _id: user._id }, process.env.JWTSECURITY);
                return res.status(202).json({ token: token, user: { _id: user._id, email: user.email, name: user.name, userphoto: user.userphoto, gender: user.gender, following: user.following, followers: user.followers } })
            }
        }
        bcrypt.hash("123456", 12, function (err, hashPassword) {
            if (err) {
                console.log("GOOGLE SIGNIN HASH PASSWORD ERROR ", err);
                return;
            }
            const newUser = new User({
                name,
                email,
                password: hashPassword,
                provider: "google"
            });
            newUser.save()
                .then(newUserResponse => {
                    console.log("NEW GOOGLE SIGN RESPONSE ", newUserResponse);
                    const token = jwt.sign({ _id: newUserResponse._id }, process.env.JWTSECURITY);
                    return res.status(202).json({ token: token, user: { id: newUserResponse._id, email: newUserResponse.email, name: newUserResponse.name, userphoto: newUserResponse.userphoto, gender: newUserResponse.gender, following: newUserResponse.following, followers: newUserResponse.followers } })
                })
                .catch(error => {
                    console.log("NEW GOOGLE SIGN RESPONSE ERROR ", error);
                })
        })
    })
}

exports.signinFacebook = (req, res) => {
    console.log("signinFacebook ", req.body);
    const { name, email } = req.body;
    User.findOne({ email }, function (err, user) {
        if (err) {
            console.log("FACEBOOK SIGNIN USER ERROR - ", err);
            return;
        }
        console.log("FACEBOOK SIGNIN USER ", user);
        if (user) {
            if (user.provider === null) {
                return res.status(422).json({ error: "This user is registerd with E-mail and password." })
            }
            if (user.provider === "google") {
                return res.status(422).json({ error: "This user is registerd with Google Signin." })
            }
            if (user.provider === "facebook") {
                const token = jwt.sign({ _id: user._id }, process.env.JWTSECURITY);
                return res.status(202).json({ token: token, user: { _id: user._id, email: user.email, name: user.name, userphoto: user.userphoto, gender: user.gender, following: user.following, followers: user.followers } })
            }
        }
        bcrypt.hash("123456", 12, function (error, hashPassword) {
            if (error) {
                console.log("FACEBOOK HASH PASSWORD ERROR ", error);
                return;
            }
            const newUser = new User({
                name,
                email,
                password: hashPassword,
                provider: "facebook"
            });
            newUser.save()
                .then(newUserSaved => {
                    console.log("new User Saved ", newUserSaved);
                    const token = jwt.sign({ _id: newUserSaved._id }, process.env.JWTSECURITY);
                    return res.status(202).json({ token: token, user: { id: newUserSaved._id, email: newUserSaved.email, name: newUserSaved.name, userphoto: newUserSaved.userphoto, gender: newUserSaved.gender, following: newUserSaved.following, followers: newUserSaved.followers } })
                })
                .catch(usererror => {
                    console.log("new User Saved ERROR ", usererror);
                })
        })
    })
}

exports.resetPassword = (req, res) => {
    console.log("RESET PASSWORD - ", req.body);
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
        console.log("RESET PASSWORD USER ERROR - ", err);
        if (err) {
            return res.status(422).json({ status: 422, error: err })
        }
        if (!user) {
            return res.status(422).json({ status: 422, error: "This e-mail does not exists." })
        }
        if(user.provider=="google") {
            return res.status(422).json({ status: 422, error: "This e-mail loggedin with Google Signin." })
        }
        if(user.provider=="facebook") {
            return res.status(422).json({ status: 422, error: "This e-mail loggedin with Facebook Signin." })
        }
        if (user) {
            // const token = jwt.sign({ name, email, password }, process.env.JWTSECURITY, { expiresIn: '10m' });
            const token = jwt.sign({ email: user.email }, process.env.JWTSECURITY, { expiresIn: '10m' });
            const resetUrl = process.env.LOCALHOST + '/new-password/' + token;
            const mailOptions = {
                from: 'pradeepbagga.delhi@gmail.com',
                to: user.email,
                subject: 'Reset Password',
                html: `Please <a href="${resetUrl}">click here</a> to Reset password.`
            };
            res.json({ status: 200, message: "Please check your e-mail to reset password." })
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("User signup email error -", error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        console.log("RESET PASSWORD USER - ", user);
    })
}

exports.newPassword = (req, res) => {
    console.log("NEW PASSWORD - ", req.body);
    const { token, password } = req.body;
    jwt.verify(token, process.env.JWTSECURITY, function (err, result) {
        console.log("NEW PASSWORD ERROR - ", err);
        if (err) {
            return res.status(422).json({ status: 422, error: "New Password link has been expired." });
        }
        console.log("NEW PASSWORD RESULT - ", result);
        if (result) {
            bcrypt.hash(password, 12, (hasherr, hashPassword) => {
                if (hasherr) {
                    console.log("NEW PASSWORD ERROR - ", hasherr);
                    return;
                }
                User.findOneAndUpdate({ email: result.email }, { password: hashPassword },
                    { new: true }
                )
                .exec((error,newPasswordSaved)=>{
                    if(error) {
                        console.log("NEW PASSWORD UPDATE ERROR - ", error);
                        return;
                    }
                    console.log("NEW PASSWORD UPDATE - ", newPasswordSaved);
                    return res.status(200).json({status:200, message:"Password has been changed please sign in."})
                })
            })
        }

    })
}