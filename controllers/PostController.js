import prisma from "../DB/db.config.js";

// Create Post
export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });

    return res.json({
      status: 200,
      data: newPost,
      msg: "Post Created Successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error creating post",
      error: error.message,
    });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        description,
      },
    });

    return res.json({
      status: 200,
      data: updatedPost,
      msg: "Post updated successfully",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        status: 404,
        msg: "Post not found",
      });
    }
    return res.status(500).json({
      status: 500,
      msg: "Error updating post",
      error: error.message,
    });
  }
};

// Fetch Posts
export const fetchPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comment: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      where: {
        OR: [
          { title: { startsWith: "NextJs" } },
          { title: { endsWith: "Nice" } },
        ],
      },
    });

    return res.json({
      status: 200,
      data: posts,
      msg: "Successfully retrieved all posts",
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error fetching posts",
      error: error.message,
    });
  }
};

// Search Post
export const searchPost = async (req, res) => {
  const query = req.query.q;

  try {
    const posts = await prisma.post.findMany({
      where: {
        description: {
          search: query,
        },
      },
    });
    return res.json({ status: 200, data: posts });
  } catch (error) {
    console.error("Error searching posts:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error searching posts",
      error: error.message,
    });
  }
};

// Show Post
export const showPost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Validate postId

    const post = await prisma.post.findUnique({
      where: { id: Number(postId) }, // Convert postId to a number
      include: {
        comments: {
          include: {
            user: {
              select: { name: true },
            },
          },
        },
        user: {
          select: { name: true, email: true },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        status: 404,
        msg: "Post not found",
      });
    }

    return res.json({
      status: 200,
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error fetching post",
      error: error.message,
    });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return res.json({ status: 200, msg: "Post successfully deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        status: 404,
        msg: "Post not found",
      });
    }
    return res.status(500).json({
      status: 500,
      msg: "Error deleting post",
      error: error.message,
    });
  }
};
