import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email already Taken. please enter another email.",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return res.json({
    status: 200,
    data: newUser,
    msg: "User Created Successfully",
  });
};

// update user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const update = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({
    status: 200,
    data: update,
    msg: "User updated successfully",
  });
};

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    /** to select the comments count we have to _count function
     * select:{
     * _count:{
     * select:{
     * post:true,
     * comment:true
     * }
     * }
     * }
     *
     */
    include: {
      post: {
        select: {
          title: true,
        },
      },
    },
  });
  return res.json({
    status: 200,
    data: users,
    msg: "Successfully get all users",
  });
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, data: user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, msg: "User successfully deleted" });
};
