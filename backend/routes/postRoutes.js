const { Router} = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const { createPost, getPosts, deletePosts, updatePost, createComment, getAllPosts, deleteComment, updateComment } = require("../controllers/postController");
const { postValidations, updatePostValidations } = require("../validations/expressValidator");
const router = Router();
router.post("/create-post", [authMiddleware, postValidations], createPost);
router.get("/get-posts", authMiddleware, getPosts);
router.get("/get-all-posts",getAllPosts);
router.get("/delete-post/:id", authMiddleware, deletePosts);

router.put("/update-post",[authMiddleware, updatePostValidations], updatePost);
router.post("/create-comment", authMiddleware, createComment);
router.get("/delete-comment", authMiddleware,deleteComment);
router.get("/update-comment", authMiddleware,updateComment);


module.exports = router;