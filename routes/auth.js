const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwt_key } = require('../keys');

// signup route
router.post('/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(422).json({ error: "All fields are required" });
        }
        else {
            User.findOne({ email })
                .then(isUser => {
                    if (isUser) {
                        return res.status(422).json({ error: "Email already exists." });
                    }
                    else {
                        bcrypt.hash(password, 12)
                            .then(hashedPw => {
                                const newUser = new User({
                                    name,
                                    email,
                                    password: hashedPw
                                })
                                newUser.save()
                                    .then(() => {
                                        res.status(201).json({ message: "Successfully Registered." });
                                    })
                                    .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        }

    } catch (err) { throw err }
});

// login route
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please add email or password." })
        }
        else {
            User.findOne({ email: email })
                .then(savedUser => {
                    if (!savedUser) {
                        return res.status(422).json({ error: "Invalid email or password" })
                    }
                    else {
                        bcrypt.compare(password, savedUser.password)
                            .then(isUser => {
                                if (isUser) {
                                    const token = jwt.sign({ id: savedUser._id }, jwt_key);
                                    res.status(200).json({ token })
                                }
                                else {
                                    return res.status(403).json({ error: "Invalid email or password." })
                                }
                            })
                    }
                })
        }
    }
    catch (err) { throw err }
})


module.exports = router;