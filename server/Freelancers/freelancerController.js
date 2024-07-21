const express = require("express");
const router = express.Router();
const Freelancer = require("./freelancerSchema");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("profilepic");
const freelancerRegistration = async (req, res) => {
  console.log("ff req.body", req.body);
  const { email } = req.body;
  const existingFreelancer = await Freelancer.findOne({ email });
  if (existingFreelancer) {
    return res.status(400).json({ message: "Email id already taken" });
  }
  try {
    const freelancer = await new Freelancer({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      qualification: req.body.qualification,
      profilepic: req.file,
      age: req.body.age,
      jobrole: req.body.jobrole,
    });
    await freelancer.save();
    res.status(201).json({
      message: "Freelancer registered successfully",
      data: freelancer,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find({});
    res.status(200).json({ message: "All freelancers", data: freelancers });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFreelancerById = async (req, res) => {
  const _id = req.params.id;
  try {
    const freelancer = await Freelancer.findById(_id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found." });
    }
    res.status(200).send({ data: freelancer, message: "Freelancer found." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login Artist
const loginFreelancer = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Freelancer.findOne({ email: email })
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

        if (data.adminApprovedStatus === "Pending") {
          return res.status(404).json({
            status: 404,
            message: "Your account has not been approved yet",
          });
        }
        if (data.adminApprovedStatus === "Rejected") {
          return res.status(404).json({
            status: 404,
            message: "Your account has been rejected by admin",
          });
        }
        return res.status(200).json({
          status: 404,
          message: "Login successfull",
          data: data,
        });
      } else {
        return res.status(404).json({
          status: 500,
          message: "Email or password is incorrect",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "User not found",
        Error: err,
      });
    });
};

//Login --finished

//update  by id
const editFreelancerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }

    const { name, contact, email, qualification, jobrole } = req.body;
    const obj = {};
    if (name) {
      obj.name = name;
    }
    if (contact) {
      obj.contact = contact;
    }
    if (email) {
      obj.email = email;
    }
    if (qualification) {
      obj.qualification = qualification;
    }
    if (jobrole) {
      obj.jobrole = jobrole;
    }
    const newUser = await Freelancer.findByIdAndUpdate(id, obj, { new: true });
    if (!newUser) {
      return res.status(404).json({
        status: 404,
        message: "Freelancer not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Freelancer updated successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server error",
    });
  }
};

const deleteFreelancerById = (req, res) => {
  Freelancer.findByIdAndDelete({ _id: req.params.id })
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

const freelancerForgotPassowrd = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await Freelancer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const update = await Freelancer.findOneAndUpdate(
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

const getAllPendingFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find({
      adminApprovedStatus: "Pending",
    });
    return res
      .status(200)
      .json({ message: "Pending freelancers", data: freelancers });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server error" });
  }
};
const getAllApprovedFreelancers = async (req, res) => {
  try {
    const freelancers = await Freelancer.find({
      adminApprovedStatus: "Approved",
    });
    return res
      .status(200)
      .json({ message: "Approved freelancers", data: freelancers });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server error" });
  }
};
const approveFreelancerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const newFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      {
        adminApprovedStatus: "Approved",
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Freelancer approved successfully", data: newFreelancer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Server error" });
  }
};
const rejectFreelancerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const newFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      {
        adminApprovedStatus: "Rejected",
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Freelancer rejected successfully", data: newFreelancer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Server error" });
  }
};
const activateFreelancerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const newFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      {
        isActive: true,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Freelancer activated successfully", data: newFreelancer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Server error" });
  }
};
const deactivateFreelancerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }
    const newFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Freelancer deactivated successfully", data: newFreelancer });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "Server error" });
  }
};

module.exports = {
  freelancerRegistration,
  loginFreelancer,
  getAllFreelancers,
  getFreelancerById,
  upload,
  editFreelancerById,
  deleteFreelancerById,
  freelancerForgotPassowrd,
  getAllApprovedFreelancers,
  getAllPendingFreelancers,
  approveFreelancerById,
  rejectFreelancerById,
  activateFreelancerById,
  deactivateFreelancerById

};
