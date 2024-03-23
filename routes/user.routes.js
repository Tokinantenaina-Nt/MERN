const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  getAllUsers,
  userInfo,
  updateUser
} = require("../controllers/user.controller");

router.post("/register", authController.signUp);
router.get("/", getAllUsers);
router.get("/:id", userInfo);
router.put("/:id", updateUser);

module.exports = router;