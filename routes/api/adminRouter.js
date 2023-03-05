const express = require("express");
const {
  getAllUsersTestsController,
  getUsersController,
  removeUserController,
} = require("../../controllers/adminController");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { adminMiddleware } = require("../../middlewares/adminMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/full-data", asyncWrapper(getAllUsersTestsController));
router.get("/users", asyncWrapper(getUsersController));
router.delete("/:userId", asyncWrapper(removeUserController));

module.exports = {
  adminRouter: router,
};
