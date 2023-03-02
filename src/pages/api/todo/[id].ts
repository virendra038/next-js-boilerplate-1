import connectDB from "@/database/db";
import todoCol from "@/database/todoCol";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function app(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    let id = req.query.id;
    id = id?.toString();
    if ( id?.length !== 24 ){
        res.status(406).send({message:"id length is not as per mongoose objectID"})
        return
    }
    const _id = new mongoose.Types.ObjectId(id);
    try {
        const todoData = await todoCol.findById({_id})
        res.status(200).send(todoData);
    } catch (err) {
        res.status(400).send((err as Error).message);
    }
}