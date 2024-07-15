const express = require("express");
const router = express.Router();
const user = require("./userSchema");

const userRegistration = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(401).json({ message: "All fields are mandatory" });
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "Email id already taken" });
    }
    const myUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    await myUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", data: myUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: "Server error" });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await user.find({});
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getuserById = async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await user.findById(_id);
    if (!user) {
      return res.status(404).json(null);
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(401).json({
      status: 401,
      message: "All fields are mandatory",
    });
  }

  user
    .findOne({ email: email })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: 404,
          message: "Email or password is incorrect",
        });
      } else if (password == data.password) {
        return res.status(200).json({
          status: 200,
          message: "Login successfully",
          data: data,
        });
      } else {
        if (password != data.password) {
          return res
            .status(404)
            .json({ message: "Email or password is incorrect" });
        } else {
          return res.status(500).json({
            message: "Server Error Please try again later.",
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "User not found",
        Error: err,
      });
    });
};

//Login --finished

//update  by id
const edituserById = (req, res) => {
  user
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

const deleteuserById = (req, res) => {
  user
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
//forgotvPawd
const userForgotPassowrd = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const isUserexist = await user.findOne({ email });
    if (!isUserexist) {
      return res.status(404).json({ message: "Please check your email" });
    }
    const update = await user.findOneAndUpdate(
      { email },
      { password: newPassword }
    );
    return res
      .status(200)
      .json({ message: "Password updated successfully", data: update });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = {
  userRegistration,
  userLogin,
  getAllusers,
  getuserById,
  edituserById,
  deleteuserById,
  userForgotPassowrd
};
