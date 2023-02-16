const express = require("express");
const {
  getTestsResultController,
  addUserTestsResultController,
  getUserTestsResultController,
} = require("../../controllers/testsController");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getTestsResultController));
router.get("/user", asyncWrapper(getUserTestsResultController));
router.post("/", asyncWrapper(addUserTestsResultController));

module.exports = {
  testsRouter: router,
};
