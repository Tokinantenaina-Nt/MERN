const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

router.post("/register", authController.signUp);
router.get("/", getAllUsers);
router.get("/:id", userInfo);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
