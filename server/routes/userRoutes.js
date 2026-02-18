const express = require("express");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const {protect} = require("../middleware/auth.middleware");

const router = express.Router();

//@route POST /api/users/register
//@desc add anew user
//@access public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    user = new User({ name, email, password });
    user.save();

    //create jwt
    const payload = { user: { id: user._id, name: user.name } };

    // sign in and return the token along user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //send the user token and reponse
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//@route /api/users/login
//@desc Authenticate user
//access public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //create jwt
    const payload = { user: { id: user._id, name: user.name } };

    // sign in and return the token along user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //send the user token and reponse
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

//@route /api/users/getProfile
//@desc get the logged in user profile
//@access private roue

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
