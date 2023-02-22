const router = require("express").Router();

const Pin = require("../models/Pin");

//new Pin

router.post("/", async (req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    const newPin = new Pin(req.body);
    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin); 
    } catch (err) {
        res.status(500).json(err);
    }
});

//get Pins

router.get("/", async (req,res) =>{
    res.set('Access-Control-Allow-Origin', '*');
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(er)
    }
})

module.exports = router;