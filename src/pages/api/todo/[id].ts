import connectDB from "@/database/db";
import todoCollection from "@/database/todoSchema";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const checkValidId = (id: string)=>{
    if(mongoose.Types.ObjectId.isValid(id)){
        if((String)(new mongoose.Types.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

export default async function app(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    let id = req.query.id!;
    id = id.toString();
    if ( !checkValidId(id) ){
        res.status(406).send({message:"id length is not as per mongoose objectID"})
        return
    }

    const _id = new mongoose.Types.ObjectId(id);
    const todoData = await todoCollection.findById({_id},{_id:1, task:1, priority:1, dueDate:1, done:1})
    if ( !todoData ){
        res.status(404).send({message:"Data with given id not found!"})
        return;
    }
    
    try {
        switch ( req.method ){
            case "GET": {
                res.status(200).send(todoData);
            }
            break;

            case "PUT": {
                await todoCollection.findOneAndUpdate({_id},req.body,{new:false});
                res.status(204).end();
            }
            break;

            case "DELETE": {
                await todoCollection.deleteOne({_id});
                res.status(200).send({
                    message:"Data deleted succesfully!"
                })
            }
            break;

            default:
                res.status(404).send({message:"Request Method Not found"})
                break;
        }
    } catch (err) {
        res.status(400).send((err as Error).message);
    }
}