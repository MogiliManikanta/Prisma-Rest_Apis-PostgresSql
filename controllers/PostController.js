import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

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
};

// update user
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  const update = await prisma.user.update({
    where: {
      id: Number(postId),
    },
    data: {
      title,
      description,
    },
  });
  return res.json({
    status: 200,
    data: update,
    msg: "User updated successfully",
  });
};

export const fetchPosts = async (req, res) => {
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
  });
  return res.json({
    status: 200,
    data: posts,
    msg: "Successfully get all users",
  });
};

export const showPost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, data: post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, msg: "Post successfully deleted" });
};
