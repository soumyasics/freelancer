const Complaint=require('./freelancercomplaintSchema')

const addComplaint=(req,res)=>{


const complaint = new Complaint({
    freelancerId: req.body.freelancerId,
    complaint: req.body.complaint
  });
  
  complaint.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json(error);

    } else {
        res.status(201).json({
            message: "Freelancer registered successfully",
            data: freelancer,
          });
        }
  })
}

const viewAllComplaints = (req, res) => {
    Complaint.find({actionTaken:{ $in: ['warning send', 'pending'] } })
     .populate('userId')
     .populate('freelancerId').
     exec().
     then((complaints) => {
        res.status(200).json({
          message: "Complaints retrieved successfully",
          data: complaints,
        });
      })
     .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error retrieving complaints",
          error: err,
        });
      });
  };

  const viewComplaintsToBeRectified = (req, res) => {
    Complaint.find({actionTaken:{ $in: ['warning send', 'pending'] } })
     .populate('userId')
     .populate('freelancerId').
     exec().
     then((complaints) => {
        res.status(200).json({
          message: "Complaints retrieved successfully",
          data: complaints,
        });
      })
     .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error retrieving complaints",
          error: err,
        });
      });
  };

  const viewComplaints = (req, res) => {
    Complaint.find({actionTaken:false})
     .then((complaints) => {
        res.status(200).json({
          message: "Complaints retrieved successfully",
          data: complaints,
        });
      })
     .catch((err) => {
        console.error(err);
        res.status(500).json({
          message: "Error retrieving complaints",
          error: err,
        });
      });
  };

module.exports={addComplaint}
  