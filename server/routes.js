const express = require("express");
const router = express.Router();
const freelancer = require("./Freelancers/freelancerController");
const user = require("./User/userController");
const Payments = require("./Payments/paymentController");
const workRequest = require("./userWorkRequest/workRequestController");
const consultancy = require("./consultancy/consultancyController");
const conWorkRequestRoutes = require("./conWorkRequest/conWorkRequestController");
const appliedVacencyRoutes = require("./appliedVacencies/appliedVacenciesController");

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
router.post("/freelancerForgotPassword", freelancer.freelancerForgotPassowrd);

// user routes
router.post("/userRegistration", user.userRegistration);
router.post("/userLogin", user.userLogin);
router.post("/getAllUsers", user.getAllusers);
router.post("/userForgotPassword", user.userForgotPassowrd);
router.patch("/edituserById/:id", user.edituserById);

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

// consultancy
router.post(
  "/consultancyRegistration",
  consultancy.upload,
  consultancy.consultancyRegistration
);
router.post("/consultancyLogin", consultancy.consultanyLogin);
router.post("/consultancyForgotPassowrd", consultancy.consultancyForgotPassowrd);
router.get("/getAllConsultancy", consultancy.getAllConsultancy);
router.get("/getConsultancyById/:id", consultancy.getConsultancyById);

// consultancy work requst routs
router.post("/con-createWorkRequest", conWorkRequestRoutes.createWorkRequest);
router.get(
  "/con-getWorkRequestsByUserid/:id",
  conWorkRequestRoutes.getWorkRequestByUserId
);
router.get("/con-getAllWorkRequest", conWorkRequestRoutes.getAllWorkRequest);
router.get(
  "/con-getWorkRequestById/:id",
  conWorkRequestRoutes.getWorkRequestById
);
router.patch(
  "/con-makeWorkRequestPending/:id",
  conWorkRequestRoutes.makeWorkRequestPending
);
router.patch(
  "/con-makeWorkRequestProgress/:id",
  conWorkRequestRoutes.makeWorkRequestProgress
);
router.patch(
  "/con-makeWorkRequestCompleted/:id",
  conWorkRequestRoutes.makeWorkRequestCompleted
);
router.patch(
  "/con-makeWorkRequestCancelled/:id",
  conWorkRequestRoutes.makeWorkRequestCancelled
);
router.post(
  "/con-workRequestFreelancerResponse/:id",
  conWorkRequestRoutes.workRequestFreelancerResponse
);
router.post(
  "/con-workRequestUserReplay/:id",
  conWorkRequestRoutes.workRequestUserReplay
);

//payments
router.post("/addPayment", Payments.addPayment);
router.get("/viewAllPayments", Payments.viewAllPayments);
router.get("/viewPaymentById/:id", Payments.viewPayment);
router.get(
  "/viewAllPaymentsByFreelancerId/:freelancerId",
  Payments.getAllPaymentsByFreelancerId
);

// applied vacencies
router.post("/applyVacency", appliedVacencyRoutes.applyVacency);
router.get(
  "/viewAllAppliedVacancies",
  appliedVacencyRoutes.viewAllAppliedVacancies
);
router.get(
  "/viewAllAppliedVacencyByConsultancyId/:id",
  appliedVacencyRoutes.viewAllAppliedVacencyByConsultancyId
);
router.get(
  "/viewAllAppliedVacencyByFreelancerId/:id",
  appliedVacencyRoutes.viewAllAppliedVacencyByFreelancerId
);
router.all("/*", (req, res) => {
  res.status(400).send({ message: "Please check api routes" });
});
module.exports = router;
