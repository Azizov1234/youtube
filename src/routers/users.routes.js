import { Router } from "express";
import userController from "../controller/user.controller.js";
import validation from "../middleware/validation.js";


const userRouter=Router()



userRouter.post("/api/register",validation.register,userController.register)
        // .post("/api/login",validation,userController.login)
        // .get("/api/users",userController.getAllUsers)
export default  userRouter
