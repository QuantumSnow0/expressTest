import { Router } from "express"
import { userController, loginController, profileController } from "../controllers/user.controller.js"
import {profileAuthenticate} from "../middlewares/authenticate.js"
const userRouter = Router()
userRouter.get("/", (req, res) => res.send("welcome to users"))
userRouter.post("/", userController)
userRouter.post("/login", loginController)
userRouter.get("/profile", profileAuthenticate, profileController)
export default userRouter;

