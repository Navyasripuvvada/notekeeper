import {Request,Response} from "express"
import {createNote,getallNote,getbyID,updateNote,deleteNote} from "../services/services"
export const createNotecontroller = async(req:Request,res:Response)=>{
    try{
        const userID = (req as any).user.id
      const {title,content} = req.body;
      const note = await createNote(title,content,userID);
      res.status(200).json(note);
    }catch(err:any){
        res.status(400).json(err.message)
    }
    
}
export const getallcontroler = async(req:Request,res:Response)=>{
    try{
        const notes =  await getallNote ();
        res.status(200).json(notes)
    }catch(err:any){
        res.status(400).json(err.message)
    }
}
export const getbyIDcontroller = async (req:Request,res:Response)=>{
    try{
        const noteId = Number(req.params.id);
        const note  =  await getbyID(noteId);
        res.status(200).json(note)
    }catch(err:any){
        res.status(400).json(err.message)
    }
}
export const updateNotecontroller = async(req:Request,res:Response)=>{
    try{
        const ID = Number(req.params.id)
        const {title,content} = req.body;
      const userID = Number((req as any).user?.id);
        const note = await updateNote(title,content,ID,userID);
        return res.status(200).json(note);
    }catch(err:any){
        res.status(400).json(err.message)
    }
}
export const deleteNotecontroller =  async(req:Request,res:Response)=>{
    try{
        const ID= Number(req.params.id)
        const note = await deleteNote(ID);
        res.status(200).json(note)
    }catch(err:any){
        res.status(400).json(err.message)
    }
}