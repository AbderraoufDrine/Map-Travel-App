const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require('bcrypt');

//Register

router.post("/register", async (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const newUser = new User(req.body);
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword,
        });
    
      const savedUser = await newUser.save();
      res.status(200).json(savedUser); 
    } catch (err) {
        res.status(500).json(err);
    }
});

//login

router.post("/login", async (req,res) =>{
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Something went wrong");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Something went wrong");
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(er)
    }
})

module.exports = router;