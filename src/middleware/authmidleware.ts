import {Response,Request,NextFunction} from "express";
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
export const authMiddleware=  (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;

    if(!header){
        return res.status(400).json("token not found")
    }
    try{
        const token = header.split(" ")[1];
        const decoded =  jwt.verify(token as string,SECRET_KEY);
        (req as any).user = decoded;
        next();
    }catch(err:any){
        res.status(400).json({message:err.message})
    }
}