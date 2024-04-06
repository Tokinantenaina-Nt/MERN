const router = require("express").Router();
const { signUp, signIn, logout } = require("../controllers/auth.controller");
const {
  getAllUsers,
  userInfo,
  updateUser,
  deleteUser,
  follow,
  unfollow
} = require("../controllers/user.controller");
const upload = require("../controllers/upload.controller");
const { uploadErrors } = require("../utils/errors.utils");

router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

//user DB
router.get("/", getAllUsers);
router.get("/:id", userInfo);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/follow/:id", follow);
router.patch("/unfollow/:id", unfollow);

//upload
router.post("/upload", upload.single("file"), (req, res) => {});

module.exports = router;
