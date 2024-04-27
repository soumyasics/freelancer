
const express = require("express");
const router = express.Router();
const freelancer = require("./Freelancers/freelancerController");
const user = require("./User/userController");
const Payments = require('./Payments/paymentController');
const workRequest = require("./userWorkRequest/workRequestController");
// freelancer routes
router.post(
  "/freelancerRegistration",
  freelancer.upload,
  freelancer.freelancerRegistration
);
router.post("/freelancerLogin", freelancer.loginFreelancer);
router.post("/editFreelancerById/:id", freelancer.editFreelancerById);
router.get("/getAllFreelancers", freelancer.getAllFreelancers);
router.post("/getFreelancerById/:id", freelancer.getFreelancerById);
router.post("/deleteFreelancerById/:id", freelancer.deleteFreelancerById);
router.post("/forgotPwd", freelancer.forgotPwd);


// user routes
router.post("/userRegistration", user.userRegistration);
router.post("/userLogin", user.userLogin);
router.post("/getAllUsers", user.getAllusers);

// user work requst routs
router.post("/createWorkRequest", workRequest.createWorkRequest);
router.get("/getWorkRequestsByUserid/:id", workRequest.getWorkRequestByUserId);
router.get("/getAllWorkRequest", workRequest.getAllWorkRequest);
router.get("/getWorkRequestById/:id", workRequest.getWorkRequestById);
router.patch("/makeWorkRequestPending/:id", workRequest.makeWorkRequestPending);
router.patch(
  "/makeWorkRequestProgress/:id",
  workRequest.makeWorkRequestProgress
);
router.patch(
  "/makeWorkRequestCompleted/:id",
  workRequest.makeWorkRequestCompleted
);
router.patch(
  "/makeWorkRequestCancelled/:id",
  workRequest.makeWorkRequestCancelled
);
router.post(
  "/workRequestFreelancerResponse/:id",
  workRequest.workRequestFreelancerResponse
);
router.post("/workRequestUserReplay/:id", workRequest.workRequestUserReplay);



//payments
router.post('/addPayment',Payments.addPayment)
router.get('/viewAllPayments',Payments.viewAllPayments)
router.get('/viewPaymentById/:id',Payments.viewPayment)

router.all("/*", (req, res) => {
  res.status(400).send({ message: "Please check api routes" });
});
module.exports = router;

