const express = require("express");
const {
  registrationController,
  loginContoller,
  currentUserContoller,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { authValidation } = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/signup", authValidation, asyncWrapper(registrationController));
router.post("/login", authValidation, asyncWrapper(loginContoller));
router.get("/current", authMiddleware, asyncWrapper(currentUserContoller));

module.exports = {
  authRouter: router,
};
