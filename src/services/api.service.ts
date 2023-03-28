import todoCollection from "@/database/todoSchema";
import { validationChecks } from "@/utils/checks";
import { TodoData, todoFields } from "@/types/todo.type";
import { filterType } from "@/types/filter.type";
import { Types } from "mongoose";

export const getAllTodoData: (parameters: filterType) => Promise<[TodoData[], number]>  = async (parameters) => {
    const { priority, isFinished, dueDate } = parameters;
    const todayDate = new Date().setHours(0,0,0,0);
    const filters = {
        ...(priority !== undefined) && {priority},
        dueDate: dueDate !== undefined ? {$gte: todayDate, $lte: dueDate} : {$gte: todayDate},
        done: isFinished !== undefined? isFinished : false
    }
    const todoData = await todoCollection.find(filters).sort({dueDate:1})
    return [todoData, 200];
}

export const postTodoData: (parameters: todoFields) => Promise<[TodoData | {message:string}, number]> = async (parameters) => {
    const { task, priority, dueDate, done} = parameters;

    let validationErrors = validationChecks({ task, priority, dueDate, done});
    if ( validationErrors !== '' )
        return [{message:"Fix following issues: "+validationErrors},400]

    const sameTodoData = await todoCollection.find({task, dueDate}).exec()
    if ( sameTodoData.length > 0 )
        return [{message:"Same Todo Data already exists"},400]

    const todoData = new todoCollection({task, priority, dueDate , done})
    const saveResponse = await todoData.save();
    const dataResponse = await todoCollection.findById({_id:saveResponse._id})
    return [dataResponse, 201]
}

export const getTodoById: (_id: Types.ObjectId) => Promise<[TodoData, number]> = async (_id )=>{
    const todoData = await todoCollection.findById({_id})
    return [todoData, 200];
}

export const updateTodoById: (payload: todoFields, _id: Types.ObjectId) => Promise<[TodoData, number]> = async (payload, _id) => {
    let response = await todoCollection.findOneAndUpdate({_id},payload,{new:true});
    return [response, 200];
}

export const deleteTodoById: (_id: Types.ObjectId) => Promise<[{message:string}, number]> = async (_id) => {
    await todoCollection.deleteOne({_id});
    return [{message:"Data deleted succesfully!"}, 200]
}

