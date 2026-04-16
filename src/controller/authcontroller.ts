import {Request,Response} from "express";
import { loginUser,registeruser } from "../services/authservices";
export const registerusercontroller = async(req: Request, res: Response)=>{
    try{
         console.log("BODY:", req.body); 
        const {name,email,password} = req.body;
        const user =await registeruser (name,email,password);
        res.json(user);

    }catch(err:any){
       res.status(400).json({ message: err.message });
    }
}
export const loginUsercontroller = async(req:Request,res:Response)=>{
    try{
        const{email,password}=req.body;
        const result = await loginUser(email,password);
        res.json(result);
    }catch(err:any)
{
    res.status(400).json({message:err.message})
}
}