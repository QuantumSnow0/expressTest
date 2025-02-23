import mongoose from "mongoose";
import {MONGODB_STRING} from "./env.js"

export const connectDb = async () => {
try{
await mongoose.connect(MONGODB_STRING)
console.log("database connected successfully")

}
catch(error){
console.error("Error connecting to database", error)
process.exit(1)
}
}
