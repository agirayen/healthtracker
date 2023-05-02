const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm123456";

const mongoUrl =
  "mongodb+srv://health:health123@cluster0.hk6fcsb.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect to db");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");

// to register
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email }); //find existing user

    if (oldUser) {
      return res.send({ error: "User Exists " });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "Updated with data" });
  } catch (error) {
    res.send({ status: "Something went wrong" });
  }
});

//to login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found " });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email:user.email}, JWT_SECRET, {
        expiresIn: 10,
    });

    if (res.status(201)) {
      return res.json({ status: "OK", data: token });
    } else {
      return res.json({ error: "ERROR" });
    }
  }
  res.json({ status: "error", error: "Invalid Password " });
});

// dashboard
app.post("/dashboard",async (req,res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if(err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if(user === "token expired"){
            return res.send({ status:"error", data:"token expired" });
        }
        const usereamil = user.email;
        User.findOne({ email: useremail })
          .then((data) => {
            res.send({ status:"dashboard data ok", data:data });
          })
          .catch((error) => {
            res.send({ status: "dashboard error", data:error });
          });
        } catch (error) {}
    
});

app.listen(5002, () => {
  console.log("Server started on port 5002");
});

// app.post("/post",async (req,res) => {
//     console.log(req.body)
//     const {data} = req.body;

//     try {
//         if(data=="hello"){
//             res.send({status:"fine"})
//         }
//         else{
//             res.send({status:"user not found"})
//         }

//     } catch (error) {
//         res.send({status:"error"})
//     }
// })
// require("./userDetails")

// const User = mongoose.model("UserInfo")

// app.post("/register",async (req,res) => {
//     const { name, email, mobileNo } = req.body;

//     try {
//         await User.create({
//             uname: name,
//             email,
//             phoneNo:mobileNo,
//         });
//         res.send({status: "data send"})
//     } catch (error) {
//         res.send({ status: "error"})
//     }
// })
