import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config/env.js"
import { User } from "../models/user.model.js"
export const profileAuthenticate = async(req, res, next) => {
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try {
token = req.headers.authorization.split(" ")[1]
const decoded = jwt.verify(token, JWT_SECRET)
req.user = await User.findById(decoded.id).select("-password")

next()
}
catch(error){
next(error)
}
}
if(!token){
res.status(401).json({message: "unauthorized"})
}
}
