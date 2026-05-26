const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch(error){
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }

});



// GET ALL USERS

router.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error",
    });

  }

});

module.exports = router;







router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});
