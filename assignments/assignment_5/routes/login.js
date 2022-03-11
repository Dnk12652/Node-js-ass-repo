const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bodyparser = require("body-parser");

const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const SECRET = "RESTAPI";

router.use(bodyparser());

//========================user Registration=====================// 
router.post("/register", body("email"), body("name") ,async (req, res) => {
    try {
        //======checking validation must contain email name password====////
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //destructuring required body values
        const {name, email, password} = req.body;
        //======encoding user enter password while registrations===///
        bcrypt.hash(password, 10, async function(err, hash) {
         
            if(err){
                res.status(400).json({
                    status: "failed",
                    message: "Invalid details"
                })
            }
            const user = await User.create(
                {
                    name, 
                    email, 
                    password:hash
                }
            );
            res.json({
                status: "success",
                user
            })
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

//========================user login =====================// 

router.post("/login", body("email"), body("password"), async (req, res) => {
    try {
        //======checking validation must contain  email and password===//
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {email, password} = req.body;
        //========finding correct user with help of user email ======//
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                status:"failed",
                message:"Invalid user"
            })
        }
        // =============comparing user enter password and database contain password=======//
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, SECRET);
                res.json({
                    status: "sucess",
                    token
                })
            }else{
                res.status(401).json({
                    status: "failed",
                    message: "Not Authenticated"
                })
            }
        });
       
    } catch (e) {
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = router;