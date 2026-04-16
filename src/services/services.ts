import {pool} from "../config/db"
export const createNote = async(title:string,content:string,user_id:Number)=>{
    const result  =  await pool.query("INSERT INTO notes (title,content,user_id) VALUES ($1,$2,$3) RETURNING title,content,user_id",[title,content,user_id]);
    return result.rows[0]
}
export const getallNote = async()=>{
    const result = await pool.query("SELECT * FROM notes");
    return result.rows;
}
export const getbyID = async(id:Number)=>{
    const result  = await pool.query("SELECT * FROM notes WHERE id=$1", [id]);
    return result.rows[0]
}
export const updateNote = async(title:string,content:string,id:number,user_id:number)=>{
    const result = await pool.query("UPDATE notes SET title=$1,content=$2,user_id=$3 WHERE id=$4 RETURNING *",[title,content,user_id,id]);
    return result.rows[0]
}
export const deleteNote = async(id:Number)=>{
    const result = await pool.query("DELETE FROM notes WHERE id=$1",[id])
    return {message:"note deleted"}
}