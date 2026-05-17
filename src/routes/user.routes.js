import {Router} from "express"
import * as userController from "../controllers/user.controllers.js"

const userRouter = Router();


userRouter.post("/signup" , userController.signup)

userRouter.post("/signin" , userController.signin)

userRouter.get("/profile" , userController.profile)

userRouter.get("/refresh-token" , userController.refreshToken)

userRouter.put("/profile/password" , userController.profilepassword)

export default userRouter;

