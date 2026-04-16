import {pool} from "../config/db";
import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
import { PassThrough } from "node:stream";
const SECRET_KEY = process.env.JWT_SECRET|| "mysecretkey";
export const registeruser = async(name:string , email:string,password:string) =>{
    const userExists=await pool.query("SELECT * FROM users WHERE email = $1",[email]);
    if (userExists.rows.length > 0){
        throw new Error("user already exists");
    }
    const hashedpassword = await bcrypt.hash(password,10);
    const result =  await pool.query("INSERT INTO users (name,email,password) VALUES($1,$2,$3) RETURNING id,name,email",[name,email,hashedpassword] )
    return result.rows[0];
};
export const loginUser = async(email:string,password:string)=>{
    const  user = await pool.query("SELECT * FROM users WHERE email=$1",[email]);
    if(user.rows.length==0){
            throw new Error ("user not found")
    }
    const validPassword = await bcrypt.compare(password,user.rows[0].password);
    if(!validPassword){
        throw new Error("Invalid password")
    }
    const token = jwt.sign({id:user.rows[0].id},SECRET_KEY,{ expiresIn: "1h" }
  );
  return token;
}
