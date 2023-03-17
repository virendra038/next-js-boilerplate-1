import todoCollection from "@/database/todoSchema";
import { NextApiRequest, NextApiResponse } from "next";

export const getAllTodoData = async (req: NextApiRequest, res: NextApiResponse) => {
    const { priority, isFinished, dueDate } = req.query;
    const filters = {
        ...(priority !== undefined) && {priority},
        ...(isFinished !== undefined) && {done:isFinished},
        ...(dueDate !== undefined) && {dueDate:{$lte:dueDate}}
    }
    const todoData = await todoCollection.find(filters,{_id:1, task:1, priority:1, dueDate:1, done:1})
    res.status(200).send(todoData)
}

export const postTodoDate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { task, priority, dueDate, done} = req.body;
    if ( dueDate && isPastDate(dueDate) ){
        res.status(400).send({message:"Due date cannot be past date!"})
        return;
    }
    const todoData = new todoCollection({task, priority, dueDate , done});
    await todoData.save();
    res.status(201).send({message:"Saved it!"})
}


type isPastDateType =  (dueDate: string) => boolean
const isPastDate: isPastDateType = (dueDate: string)=>{
    const todayDate = new Date()
    const givenDate = new Date(dueDate)
    todayDate.setHours(0,0,0,0)  
    givenDate.setHours(0,0,0,0)  
    if ( givenDate.getTime() >= todayDate.getTime() )
        return false;
    return true;
}
