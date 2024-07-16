const express = require("express");
const router = express.Router();
const user = require("./userSchema");
const mongoose = require("mongoose");

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
        if (!data.isActive) {
          return res.status(404).json({
            status: 404,
            message: "Your account has been deactivated",
          });
        }
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

const activateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const isUserExist = await user.findByIdAndUpdate(id, { isActive: true });
    if (!isUserExist) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User activated successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Server error",
    });
  }
};

const deActivateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const isUserExist = await user.findByIdAndUpdate(id, { isActive: false }, {new: true});
    if (!isUserExist) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }


    return res.status(200).json({
      status: 200,
      message: "User deactivated successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: "Server error",
    });
  }
};


//Login --finished

//update  by id
const edituserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }

    const { firstName, lastName, email } = req.body;
    const obj = {};
    if (firstName) {
      obj.firstName = firstName;
    }
    if (lastName) {
      obj.lastName = lastName;
    }
    if (email) {
      obj.email = email;
    }
    const newUser = await user.findByIdAndUpdate(id, obj, { new: true });
    if (!newUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server error",
    });
  }
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
  activateUserById,
  deActivateUserById,
  getAllusers,
  getuserById,
  edituserById,
  deleteuserById,
  userForgotPassowrd,
};
