const express = require("express");
const {
  getTestsResultController,
  addUserTestsResultController,
  getUserTestsResultController,
} = require("../../controllers/testsController");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  testResultMiddleware,
} = require("../../middlewares/testResultMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getTestsResultController));
router.get("/user-tests", asyncWrapper(getUserTestsResultController));
router.post(
  "/",
  testResultMiddleware,
  asyncWrapper(addUserTestsResultController)
);

module.exports = {
  testsRouter: router,
};
