const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('./Middleware/fetchuser');

const JWT_SECRET= "nishantIsearningNodeJs";

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 characters").isLength({ min: 5 })
  ],
  async (req, res) => {
    // console.log(req.body);
    // const user= User(req.body);
    // user.save();
    // res.json(req.body)
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
          
        }
      const salt= await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user: {
            id: user.id
        }
      }
      const authToken= jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken: authToken});
    } catch (err) {
      console.log(err);
      res.status(500).send("Some Error occured");
    }
    //   then(user => res.json(user))
    //   .catch(err=>{console.log(err.message);
    //     res.json({error: 'Please enter a unique value for email',
    //     msg: err.message})
    // });
    // res.send(req.body)
  }
);

router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password must not be Blank").exists()
    ],
    async (req, res) => {
      // console.log(req.body);
      // const user= User(req.body);
      // user.save();
      // res.json(req.body)
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      const {email, password} = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res
            .status(400)
            .json({success, error: "Please try to login with valid credentials" });
        }
        const passwordCompare= await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400)
            .status(400)
            .json({success, error: "Please try to login with valid credentials" });
        }
        const data={
          user: {
              id: user.id
          }
        }
        success=true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success,authToken: authToken});
      } catch (err) {
        console.log(err);
        res.status(500).send("Some Error occured");
      }
      //   then(user => res.json(user))
      //   .catch(err=>{console.log(err.message);
      //     res.json({error: 'Please enter a unique value for email',
      //     msg: err.message})
      // });
      // res.send(req.body)
    }
  );

  router.post(
    "/getuser", fetchuser,
    async (req, res) => {
      try {
        let id=req.user.id;
        console.log(`Get User: ${req.user.id}`);
        const user=await User.findById(id).select("-password");
        res.json(user);  
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      }
    }
  );

module.exports = router;
