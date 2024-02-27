const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.use(express.json());
app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000', // Update with the actual origin of your React app
//   credentials: true,
// }));



app.use("/files", express.static("files"));

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this option for MongoDB driver upgrade
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Model and upload setup
const PdfSchema = require("./pdfDetails");
const upload = multer({ storage: storage });

// POST endpoint for file upload
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// GET endpoint to retrieve files
app.get("/get-files", async (req, res) => {
  try {
    const data = await PdfSchema.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// DELETE endpoint to delete a file by ID
app.delete("/delete-file/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await PdfSchema.findById(fileId);
    if (file) {
      await PdfSchema.findByIdAndDelete(fileId);
      const filePath = `./files/${file.pdf}`;
      fs.unlinkSync(filePath); // Remove the file from storage
      res.send({ status: "ok" });
    } else {
      res.status(404).json({ status: "File not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Default route
app.get("/", async (req, res) => {
  res.send("Success!!!!!!");
});

// Server listening on port 5000
// app.listen(5000, () => {
//   console.log("Server Started");
// });

// REST for sign-in and sign-up
require("./userDetails");
require("./imageDetails");

const User = mongoose.model("UserInfo");
const Images = mongoose.model("ImageDetails");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});


app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) { }
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: { 
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

//yeh meine kiya hai
app.patch("/editUser/:id", async (req, res) => {
  const  userId  = req.params.id;
  const { updatedUserData } = req.body;
  console.log(req.body);
  console.log(req.params);
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedUserData },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ status: "Error", data: "User not found" });
    }

    res.send({ status: "Ok", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "Error", data: "Internal Server Error" });
  }
});

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });

  }
})

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data })
    })

  } catch (error) {

  }
})

app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const lastIndex = (page) * limit

  const results = {}
  results.totalUser=allUser.length;
  results.pageCount=Math.ceil(allUser.length/limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    }
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    }
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results)
})









// user creation code 


// ...

app.post("/createuser", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "User Already Exists" });
    }

    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType: "user", // Assuming you want to set a default user type as "user".
    });

    res.send({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.json({ status: "error", message: "User creation failed" });
  }
});

// ...

  









// ------------------------------------*forget password code *--------------------------------------



    app.post('/forgot-password', (req, res) => {
      const {email} = req.body;
      UserModel.findOne({email: email})
      .then(user => {
          if(!user) {
              return res.send({Status: "User not existed"})
          } 
          const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'aryanpandya2492002@gmail.com',
                pass: 'sdeg vuqb gdpg sfdz'
              }
            });
            
            var mailOptions = {
              from: 'aryanpandya2492002@gmail.com',
              to: 'user email@gmail.com',
              subject: 'Reset Password Link',
              text: `http://localhost:5173/reset_password/${user._id}/${token}`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                return res.send({Status: "Success"})
              }
            });
      })
  })





app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})





















// Route for handling forgot password
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ status: "User Not Exists!!" });
    }

    // Create a token with user's email and user's password hash
    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });

    // Create a reset link
    const resetLink = `http://localhost:5000/reset-password/${user._id}/${token}`;








    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aryanpandya2492002@gmail.com", // Change this to your email
        pass: "sdeg vuqb gdpg sfdz", // Change this to your email password
      },
    });

    const mailOptions = {
      from: "aryanpandya2492002@gmail.com", // Change this to your email
      to: user.email,
      subject: "Password Reset",
      text: resetLink,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ status: "Email not sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});