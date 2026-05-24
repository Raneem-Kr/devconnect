import express from "express";

import {
  createPost,
  getPosts,
  deletePost,
  likePost,
} from "../controllers/postController.js";

const router = express.Router();

// CREATE POST
router.post("/", createPost);

// GET POSTS
router.get("/", getPosts);

// DELETE POST
router.delete("/:id", deletePost);

// LIKE POST
router.put("/:id/like", likePost);

export default router;
