import connectDB from "@/database/db";
import todoCol from "@/database/todoCol";
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
    const todoData = await todoCol.findById({_id})
    if ( !todoData ){
        res.status(404).send({message:"Data with given id not found!"})
        return;
    }
    
    try {
        if ( req.method === 'GET' ){
            res.status(200).send(todoData);
        }
        else if ( req.method === 'PUT' ){
            await todoCol.findOneAndUpdate({_id},req.body,{new:false});
            res.status(200).send({
                message:"Updated data succesfully"
            });
        }
    } catch (err) {
        res.status(400).send((err as Error).message);
    }
}