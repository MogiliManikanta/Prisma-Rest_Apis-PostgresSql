import { Router } from "express";
import {
  fetchComments,
  updateComment,
  deleteComment,
  createComment,
  showComment,
} from "../controllers/CommentController.js";
const router = Router();

router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/", fetchComments);
router.get("/:id", showComment);

export default router;
