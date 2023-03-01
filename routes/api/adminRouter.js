const express = require("express");
const {
  getAllUsersDataController,
  getUsersController,
} = require("../../controllers/adminController");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { adminMiddleware } = require("../../middlewares/adminMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get(
  "/full-data",
  adminMiddleware,
  asyncWrapper(getAllUsersDataController)
);

router.get("/users", adminMiddleware, asyncWrapper(getUsersController));

module.exports = {
  adminRouter: router,
};
