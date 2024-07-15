const ConsultancyModel = require("./consultancySchema");
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
const consultancyRegistration = async (req, res) => {
  const { email } = req.body;
  const existingConsultancy = await ConsultancyModel.findOne({ email });
  if (existingConsultancy) {
    return res.status(400).json({ message: "Email id already taken" });
  }
  try {
    const consultancy = await new ConsultancyModel({
      name: req.body.name,
      contact: req.body.contact,
      email: req.body.email,
      password: req.body.password,
      licenseId: req.body.licenseId,
      profilepic: req.file,
      address: req.body.address,
    });
    await consultancy.save();
    return res.status(201).json({
      message: "ConsultancyModel registered successfully",
      data: consultancy,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const consultanyLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  ConsultancyModel.findOne({ email: email })
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

const getAllConsultancy = async (req, res) => {
  try {
    const consultancies = await ConsultancyModel.find({});
    return res
      .status(200)
      .json({ message: "All Consultancy", data: consultancies });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getConsultancyById = async (req, res) => {
  const _id = req.params.id;
  try {
    const consultancy = await ConsultancyModel.findById(_id);
    if (!consultancy) {
      return res.status(404).json({ message: "ConsultancyModel not found." });
    }
    res
      .status(200)
      .send({ data: consultancy, message: "ConsultancyModel found." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Login --finished

//update  by id
const editConsultancyById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        status: 404,
        message: "Id is not valid",
      });
    }

    const { name, contact, licenseId, address, email } = req.body;
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
    if (licenseId) {
      obj.licenseId = licenseId;
    }
    if (address) {
      obj.address = address;
    }
    const newUser = await ConsultancyModel.findByIdAndUpdate(id, obj, { new: true });
    if (!newUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "consultancy updated successfully",
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
  ConsultancyModel.findByIdAndDelete({ _id: req.params.id })
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

const consultancyForgotPassowrd = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const isUserexist = await ConsultancyModel.findOne({ email });
    if (!isUserexist) {
      return res.status(404).json({ message: "Please check your email" });
    }
    const update = await ConsultancyModel.findOneAndUpdate(
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
  getAllConsultancy,
  getConsultancyById,
  consultancyRegistration,
  consultanyLogin,
  upload,
  editConsultancyById,
  deleteFreelancerById,
  consultancyForgotPassowrd,
};
