const express = require("express");
const mongoose = require('mongoose');
const loginRoutes = require("./routes/login");
const postRoutes = require("./routes/posts");

//=====assigning secret code =====////
const SECRET = "RESTAPI";
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/restapi');
const app = express();

app.use("/posts", (req, res, next) =>{
    var token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(401).json({
            status: "failed",
            message: "Token is missing"
        })
    }
    // =======verify the token 
    jwt.verify(token, SECRET, async function(err, decoded) {
        if(err){
            return res.status(401).json({
                status:"failed",
                message: "Invalid token"
            })
        }
        req.user = decoded.data;
        next();
    });
});

app.use("/login", loginRoutes);
app.use("/posts", postRoutes);


app.listen(3000, () => console.log("server is started"));