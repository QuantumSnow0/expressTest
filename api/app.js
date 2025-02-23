import express from "express"
import {PORT} from "../config/env.js"
import userRouter from "../routes/users.routes.js";
import {errorMiddleware} from "../middlewares/error.middleware.js"
import {connectDb} from "../config/db.js"
const app = express();
app.use(express.json())
connectDb()
app.use("/api/v1/users", userRouter)
app.get("/", (req, res) => res.send("welcome to express"))
app.use(errorMiddleware)
app.listen(PORT, '0.0.0.0', () => console.log(`listening to http://localhost:${PORT}`))
