const AppliedVacencyModel = require("./appliedVacenciesSchema");

const applyVacency = async (req, res) => {
  try {
    const { vacencyId, consultancyId, freelancerId } = req.body;

    if (!vacencyId || !consultancyId || !freelancerId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const alreadyApplied = await AppliedVacencyModel.findOne({
      vacencyId,
      consultancyId,
      freelancerId,
    });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for this vacency" });
    }


    const newApply = new AppliedVacencyModel({
      vacencyId,
      consultancyId,
      freelancerId,
    });

    await newApply.save();

    return res
      .status(200)
      .json({ message: "Applied successfully", data: newApply });
  } catch (error) {
    console.log("error on apply vacencies", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const viewAllAppliedVacancies = async (req, res) => {
  try {
    const appliedVacencies = await AppliedVacencyModel.find()
      .populate("vacencyId")
      .populate("consultancyId")
      .populate("freelancerId")
      .exec();
    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: appliedVacencies });
  } catch (error) {
    console.log("error on get applied vacencies", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewAllAppliedVacencyByConsultancyId = async (req, res) => {
  try {
    const consultancyId = req.params.id;
    const appliedVacencies = await AppliedVacencyModel.find({
      consultancyId,
    })
      .populate("vacencyId")
      .populate("freelancerId")
      .populate("consultancyId")
      .exec();
    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: appliedVacencies });
  } catch (error) {
    console.log("error on get applied vacencies", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewAllAppliedVacencyByFreelancerId = async (req, res) => {
  try {
    const freelancerId = req.params.id;
    const appliedVacencies = await AppliedVacencyModel.find({
      freelancerId,
    })
      .populate("vacencyId")
      .populate("freelancerId")
      .populate("consultancyId")
      .exec();
    return res
      .status(200)
      .json({ message: "data obtained Successfully", data: appliedVacencies });
  } catch (error) {
    console.log("error on get applied vacencies", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  applyVacency,
  viewAllAppliedVacancies,
  viewAllAppliedVacencyByConsultancyId,
  viewAllAppliedVacencyByFreelancerId,
};
