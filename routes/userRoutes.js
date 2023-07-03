const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");


//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//APply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notifiaction  Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Doctor || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
router.get("/getAllDoctors",authMiddleware,getAllDocotrsController);

router.post("/book-appointment", authMiddleware, bookeAppointmnetController);
router.post(
  "/booking-availbility",
  authMiddleware,
  bookingAvailabilityController
);
router.get("/user-appointments",authMiddleware,userAppointmentsController);
module.exports = router;