const express = require("express");
const {
  registrationController,
  loginContoller,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authValidation } = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.post("/signup", authValidation, asyncWrapper(registrationController));
router.post("/login", authValidation, asyncWrapper(loginContoller));

module.exports = {
  authRouter: router,
};
