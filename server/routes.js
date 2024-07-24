const express = require("express");
const router = express.Router();
const freelancer = require("./Freelancers/freelancerController");
const user = require("./User/userController");
const Payments = require("./Payments/paymentController");
const workRequest = require("./userWorkRequest/workRequestController");
const consultancy = require("./consultancy/consultancyController");
const conWorkRequestRoutes = require("./conWorkRequest/conWorkRequestController");
const appliedVacencyRoutes = require("./appliedVacencies/appliedVacenciesController");
const chatRoutes = require("./chat-users-freelancers/chatUsersController");
const chatConsultancy = require("./chat-users-consultancies/chatUsersController");
const rateFreelancer = require("./rateFreelancer/rateFreelancerController");
const complaintFreelancer = require("./complaintFreelancer/complaintFreelancerController");
const complaintUser = require("./complaintUser/complaintUserController");
const inteviewRoutes = require("./interview/interviewController");
const chatConsFreelancerRoutes = require("./chat-con-freelancers/chatConsWithFreeController");
const multer = require("multer");

// freelancer routes
router.post(
  "/freelancerRegistration",
  freelancer.upload,
  freelancer.freelancerRegistration
);
router.post("/freelancerLogin", freelancer.loginFreelancer);
router.patch("/editFreelancerById/:id", freelancer.editFreelancerById);
router.get("/getAllFreelancers", freelancer.getAllFreelancers);
router.post("/getFreelancerById/:id", freelancer.getFreelancerById);
router.post("/deleteFreelancerById/:id", freelancer.deleteFreelancerById);
router.post("/freelancerForgotPassword", freelancer.freelancerForgotPassowrd);
router.get("/getAllPendingFreelancers", freelancer.getAllPendingFreelancers);
router.get("/getAllApprovedFreelancers", freelancer.getAllApprovedFreelancers);
router.patch("/approveFreelancerById/:id", freelancer.approveFreelancerById);
router.patch("/rejectFreelancerById/:id", freelancer.rejectFreelancerById);
router.patch("/activateFreelancerById/:id", freelancer.activateFreelancerById);
router.patch(
  "/deactivateFreelancerById/:id",
  freelancer.deactivateFreelancerById
);

// user routes
router.post("/userRegistration", user.userRegistration);
router.post("/userLogin", user.userLogin);
router.post("/getAllUsers", user.getAllusers);
router.post("/userForgotPassword", user.userForgotPassowrd);
router.patch("/edituserById/:id", user.edituserById);
router.patch("/activateUserById/:id", user.activateUserById);
router.patch("/deactivateUserById/:id", user.deActivateUserById);

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
router.delete(
  "/deleteUserWorkRequestById/:id",
  workRequest.deleteUserWorkRequestById
);
// consultancy
router.post(
  "/consultancyRegistration",
  consultancy.upload,
  consultancy.consultancyRegistration
);
router.post("/consultancyLogin", consultancy.consultanyLogin);
router.post(
  "/consultancyForgotPassowrd",
  consultancy.consultancyForgotPassowrd
);
router.get("/getAllConsultancy", consultancy.getAllConsultancy);
router.get("/getConsultancyById/:id", consultancy.getConsultancyById);
router.patch("/editConsultancyById/:id", consultancy.editConsultancyById);
router.patch("/approveConsultancyById/:id", consultancy.approveConsultancyById);
router.patch("/rejectConsultancyById/:id", consultancy.rejectConsultancyById);
router.patch(
  "/activateConsultancyById/:id",
  consultancy.activateConsultancyById
);
router.patch(
  "/deactivateConsultancyById/:id",
  consultancy.deactivateConsultancyById
);
router.get(
  "/getAllApprovedConsultancies",
  consultancy.getAllApprovedConsultancies
);
router.get(
  "/getAllPendingConsultancies",
  consultancy.getAllPendingConsultancies
);

// consultancy work requst routs

router.post("/con-createWorkRequest", conWorkRequestRoutes.createWorkRequest);
router.get(
  "/con-getWorkRequestById/:id",
  conWorkRequestRoutes.getWorkRequestById
);
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

router.post(
  "/applyConVacancy/:id",
  conWorkRequestRoutes.uploadResume,
  conWorkRequestRoutes.applyVacancy
);
router.get(
  "/getAllFreelancersByVacancyId/:id",
  conWorkRequestRoutes.getAllFreelancersByVacancyId
);
router.get(
  "/getAllAppliedWorksByFreelancerId/:id",
  conWorkRequestRoutes.getAllAppliedWorksByFreelancerId
);
//payments
router.post("/addPayment", Payments.addPayment);
router.get("/viewAllPayments", Payments.viewAllPayments);
router.get("/viewPaymentById/:id", Payments.viewPayment);
router.get(
  "/viewAllPaymentsByFreelancerId/:freelancerId",
  Payments.getAllPaymentsByFreelancerId
);
router.get("/getPaymentDataByWorkId/:id", Payments.getPaymentDataByWorkId);

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

// user freelancer chat routes

router.post("/sendMessageToUser", chatRoutes.sendMessage);
router.post("/getUserMessages", chatRoutes.getUserMessages);
router.post("/sendMessageToUserConsultancy", chatConsultancy.sendMessage);
router.post("/getUserMessagesConsultancy", chatConsultancy.getUserMessages);

// rate freelancer
router.post("/addRating", rateFreelancer.addRating);
router.get("/getAllRating", rateFreelancer.getAllRating);
router.get(
  "/getAllRatingByFreelancerId/:id",
  rateFreelancer.getAllRatingByFreelancerId
);

// freelancer complaints
router.post("/freelnacerComplaint", complaintFreelancer.freelnacerComplaint);
router.get("/getAllCompliants", complaintFreelancer.getAllCompliants);
router.get(
  "/getAllCompliantsByFreelancerId/:id",
  complaintFreelancer.getAllCompliantsByFreelancerId
);
router.post("/userComplaint", complaintUser.userComplaint);
router.get("/user-getAllCompliants", complaintUser.getAllCompliants);
router.get(
  "/getAllCompliantsByUserId/:id",
  complaintUser.getAllCompliantsByUserId
);

// interview schedules
router.post("/scheduleInterview", inteviewRoutes.scheduleInterview);
router.post("/getAllInterviews", inteviewRoutes.getAllInterviews);
router.post("/getInterviewById/:id", inteviewRoutes.getInterviewById);
router.post(
  "/getAllInterviewsByFreelancerId/:id",
  inteviewRoutes.getAllInterviewsByFreelancerId
);
router.post(
  "/getAllInterviewsByConsultancyId/:id",
  inteviewRoutes.getAllInterviewsByConsultancyId
);
router.post(
  "/getAllInterviewsByVacencyId/:id",
  inteviewRoutes.getAllInterviewsByVacencyId
);

// chat consultancy freelancer

router.post("/sendMessageConsFreelancer", chatConsFreelancerRoutes.sendMessage);
router.get(
  "/getUserMessagesConsFreelancer",
  chatConsFreelancerRoutes.getUserMessages
);

router.all("/*", (req, res) => {
  res.status(400).send({ message: "Please check api routes" });
});
module.exports = router;
