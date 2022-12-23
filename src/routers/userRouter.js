import express from "express";

const userRouter = express.Router();

const handleEdit = (req, res) => res.send("Edit user");
const handleDelete = (req, res) => res.send("Delete user");

userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleDelete);

export default userRouter;