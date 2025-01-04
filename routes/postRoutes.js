import { Router } from "express";
import {
  createPost,
  fetchPosts,
  showPost,
  deletePost,
  updatePost,
  searchPost,
} from "../controllers/PostController.js";
const router = Router();

router.get("/", fetchPosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/search", searchPost);
router.get("/:id", showPost);

export default router;
