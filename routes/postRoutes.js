import { Router } from "express";
import {
  createPost,
  fetchPosts,
  showPost,
  deletePost,
  updatePost,
} from "../controllers/PostController.js";
const router = Router();

router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/", fetchPosts);
router.get("/:id", showPost);

export default router;
