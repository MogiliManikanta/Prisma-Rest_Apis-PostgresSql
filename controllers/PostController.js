import prisma from "../DB/db.config.js";

// export const createPost = async (req, res) => {
//   const { user_id, title, description } = req.body;

//   const newPost = await prisma.post.create({
//     data: {
//       user_id: Number(user_id),
//       title,
//       description,
//     },
//   });
//   return res.json({
//     status: 200,
//     data: newPost,
//     msg: "Post Created Successfully",
//   });
// };

// // update user
// export const updatePost = async (req, res) => {
//   const postId = req.params.id;
//   const { title, description } = req.body;

//   const update = await prisma.user.update({
//     where: {
//       id: Number(postId),
//     },
//     data: {
//       title,
//       description,
//     },
//   });
//   return res.json({
//     status: 200,
//     data: update,
//     msg: "User updated successfully",
//   });
// };

// export const fetchPosts = async (req, res) => {
//   try {
//     const posts = await prisma.post.findMany({
//       include: {
//         comment: {
//           include: {
//             user: {
//               select: {
//                 name: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         id: "desc",
//       },
//       where: {
//         comment_count: {
//           gt: 1,
//         },
//       },
//     });

//     return res.json({
//       status: 200,
//       data: posts,
//       msg: "Successfully retrieved all posts",
//     });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return res.status(500).json({
//       status: 500,
//       msg: "Error fetching posts",
//       error: error.message,
//     });
//   }
// };

// export const showPost = async (req, res) => {
//   const postId = req.params.id;
//   const post = await prisma.post.findFirst({
//     where: {
//       id: Number(postId),
//     },
//   });
//   return res.json({ status: 200, data: post });
// };

// export const deletePost = async (req, res) => {
//   const postId = req.params.id;
//   await prisma.post.delete({
//     where: {
//       id: Number(postId),
//     },
//   });
//   return res.json({ status: 200, msg: "Post successfully deleted" });
// };

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  try {
    // Ensure the user exists
    const userExists = await prisma.user.findUnique({
      where: { id: Number(user_id) },
    });

    if (!userExists) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }

    // Create the post
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

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  try {
    const postExists = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!postExists) {
      return res.status(404).json({ status: 404, msg: "Post not found" });
    }

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
    return res.status(500).json({
      status: 500,
      msg: "Error updating post",
      error: error.message,
    });
  }
};

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
        comment_count: {
          gte: 1, // Use 'comment_count' instead of 'comments_count'
        },
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

// const posts = await prisma.post.findMany({
//   include: {
//     comments: true,
//   },
//   where: {
//     comments: {
//       some: {}, // Ensures at least one comment exists
//     },
//   },
//   orderBy: {
//     id: "desc",
//   },
// });

export const showPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(postId) },
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
      return res.status(404).json({ status: 404, msg: "Post not found" });
    }

    return res.json({ status: 200, data: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error fetching post",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const postExists = await prisma.post.findUnique({
      where: { id: Number(postId) },
    });

    if (!postExists) {
      return res.status(404).json({ status: 404, msg: "Post not found" });
    }

    await prisma.post.delete({
      where: { id: Number(postId) },
    });

    return res.json({ status: 200, msg: "Post successfully deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      status: 500,
      msg: "Error deleting post",
      error: error.message,
    });
  }
};
