const router = require("express").Router();

const {
  readPost,
  createPost,
  updatePost,
  deletePost
} = require("../controllers/post.controller");

router.get("/", readPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
