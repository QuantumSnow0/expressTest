import { config } from "dotenv";
config()
export const { 
PORT, 
MONGODB_STRING, 
JWT_SECRET, 
JWT_EXPIRES_IN 
} = process.env
