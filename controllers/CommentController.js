import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  //Increase the comment Counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });
  return res.json({
    status: 200,
    data: newComment,
    msg: "Comment Created Successfully",
  });
};

// update user
export const updateComment = async (req, res) => {
  const comment_Id = req.params.id;
  const { user_id, post_id, comment } = req.body;

  const update = await prisma.user.update({
    where: {
      id: Number(comment_Id),
    },
    data: {
      user_id,
      post_id,
      comment,
    },
  });
  return res.json({
    status: 200,
    data: update,
    msg: "User updated successfully",
  });
};

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      post: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return res.json({
    status: 200,
    data: comments,
    msg: "Successfully get all comments",
  });
};

export const showComment = async (req, res) => {
  const comment_Id = req.params.id;
  const comment = await prisma.comment.findFirst({
    where: {
      id: Number(comment_Id),
    },
  });
  return res.json({ status: 200, data: comment });
};

export const deleteComment = async (req, res) => {
  const comment_Id = req.params.id;
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: Number(comment_Id),
    },
  });
  return res.json({ status: 200, msg: "Comment successfully deleted" });
};
