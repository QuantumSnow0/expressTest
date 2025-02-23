import { User } from "../models/user.model.js";
import {hashPassword} from "../utils/encryptPassword.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js"
export const userController = async (req, res, next) => {
	try {
  const {user, email, password} = req.body
 const encryptPass = await hashPassword(password)	
  const savedUser = await User.create({user, email, password : encryptPass})
	res.status(201).json({savedUser})
	}
	catch(error){
        next(error)
	}
  
}
export const loginController = async(req, res, next) => {
  try {
  const {email, password} = req.body
  const user = await User.findOne({email})
if(!user) {
return res.status(400).json({message: "user not found"})
}
  const isMatch = await bcryptjs.compare(password, user.password)
if(!isMatch) {
return res.status(401).json({message: "unauthorized"})
}
const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})	
res.status(201).json({
	username: user.user,
	email: user.email,
	token: token
}) 
	  
  } catch(error){
   next(error)
  }
}

export const profileController = async (req, res) => {
res.status(200).json({
	message: "welcome home",
	data: req.user
})
}
