const express = require("express");
const router = express.Router();
const Freelancer = require("./freelancerSchema");

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
        return res.status(200).json({
          status: 404,
          message: "Login successfull",
          data: data,
        });
      } else {
        return res.status(500).json({
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
const editFreelancerById = (req, res) => {
  Freelancer.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      qualification: req.body.qualification,
      profilepic: req.file,
      age: req.body.age,
      jobrole: req.body.jobrole,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        message: "Updated successfully",
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
//forgotvPawd
const forgotPwd = (req, res) => {
  Freelancer.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "Artist Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

module.exports = {
  freelancerRegistration,
  getAllFreelancers,
  getFreelancerById,
  upload,
  loginFreelancer,
  editFreelancerById,
  deleteFreelancerById,
  forgotPwd,
};
