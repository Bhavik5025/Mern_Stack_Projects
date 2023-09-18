const express = require('express');
require('./dbconnection/connect');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwt_secret = "ahcdhd";
const bcypt = require("bcryptjs");
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5000"
}
));
app.use(fileUpload({
    useTempFiles:true
}))

cloudinary.config({
    cloud_name:"dg1xa2wxc",
    api_key:"452455257352791",
    api_secret:"abqeFSLOmQQPyNg7OB1yg2IuBzw"
})

app.get('/', (req, res) => {
    res.send("hello");
});

app.post("/post", async (req, res) => {
    console.log(req.body);
    if (req.body.name == "bhavik") {
        res.send("welcome");
    }
});

const user = require('./dbconnection/uschema');
//registration api
app.post("/register", async (req, res) => {
    let user1 = new user(req.body);
    let result = await user1.save();
    res.send(result);

})


//login api

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const existence = await user.findOne({ email });
    if (!existence) {
        return res.json({ error: "User not Found" });
    }
    if (password == existence.password) {
        const token = jwt.sign({ email: existence.email }, jwt_secret);
        if (res.status(201)) {
            return res.json({ status: "ok", data: token })
        }
        else {
            return res.json({ error: "error" });
        }
    }

    res.json({ status: "error", error: "Invalid Password" });
});
//user details after login
app.post("/userdata", async (req, res) => {
    const token = req.body;
    try {
        const tokenverify = jwt.verify(token, jwt_secret);
        const useremail = tokenverify.email;
        user.findOne({ email: useremail }).then((data) => res.send({ status: "ok", data: data })).catch((error) => res.send({ satus: "error", data: error }));

    } catch (error) {

    }
})

app.post("/upload",async (req,res) => {
    try{
        
        console.log(req.files)
    res.json({
        success:true,
        file
    })
    }catch(e)
    {
        res.json({
            success:false,
            error:e.message
        })
    }
})
app.listen(3000);