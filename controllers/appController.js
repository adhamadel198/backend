const bcrypt = require("bcrypt");
const userModel = require("../models/userModel.js");
const sendMail = require("../controllers/sendMail.js");

require('dotenv').config();

const emailContent = {
  subject: "Custom Subject",
  body: {
    name: "Ze2red",
    intro: "Welcome to our website",
    table: {
      data: [
        {
          item: "Nodemailer bot",
          desciption: "Cloud",
        },
      ],
    },
  },
};

const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    let exist = await userModel.findOne({ username });
    if (!exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
};
// localhost:3001/api/register
const register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    const existUsername = new Promise((resolve, reject) => {
      userModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use a unique username" });
        resolve();
      });
    });

    const existEmail = new Promise((resolve, reject) => {
      userModel.findOne({ email }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use a unique email" });
        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new userModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
                personTypeId: 1,
              });

              user.save()
                .then((result) => {
                  res.status(201).send({ msg: "User registered successfully" });
                })
                .catch((error) => {
                  res.status(500).send({ error });
                });

              sendMail(email, emailContent)
                .then(() => {
                  console.log("Email sent successfully");
                })
                .catch((error) => {
                  console.error("Error sending email:", error);
                });
            })
            .catch((error) => {
              res.status(500).send({
                error: "Unable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  } catch (error) {
    res.status(500).send({ error });
  }
};


// localhost:3001/api/login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      toast.error("Username not found");
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      toast.error("Password does not match");
      return res.status(400).send({ error: "Password does not match" });
    }

    return res.status(200).send({
      msg: "Login Successful",
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

// localhost:3001/api/user/user1
const getUser = async (req, res) => {
  const { username } = req.params;
  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });
    userModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldnot find the User" });

      return res.status(201).send(user);
    });
  } catch (error) {
    return res.status(404).send({ error: "Cannot find User Data" });
  }
};

// localhost:3001/api/updateUser
const updateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      const body = req.body;

      userModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated...!" });
      });
    } else {
      return res.status(400).send({ error: "User ID not provided...!" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const updateTopics = async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      const { topic } = req.body;

      await userModel.updateOne({ _id: userId }, { topic });

      return res.status(201).send({ msg: "User Topics Updated...!" });
    } else {
      return res.status(400).send({ error: "User ID not provided...!" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};


module.exports = {
  verifyUser,
  register,
  login,
  getUser,
  updateUser,
  updateTopics,
};