import { Router } from "express";
import { registerUser } from "../controller/user/register-user";
import { loginUser } from "../controller/user/login-user";
import { getUser } from "../controller/user/get-user";
import { updateUser } from "../controller/user/update-user";
import { getAllUsers } from "../controller/user/get-all-users";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const userRouter = Router();

// Auth routes (no middleware needed)
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected user management routes
userRouter.get("/users", verifyToken, isAdmin, getAllUsers);
userRouter.get("/user/:userId", verifyToken, getUser);
userRouter.put("/user/:userId", verifyToken, updateUser);

export default userRouter;

