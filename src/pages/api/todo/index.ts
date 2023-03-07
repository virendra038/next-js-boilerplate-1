import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/db";
import todoCol from "@/database/todoCol";

const  handler = async function (req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    try {
        if (req.method === "GET") {
            const filters = JSON.parse(JSON.stringify({
                dueDate:req.query.dueDate,
                priority:req.query.priority,
                done:req.query.isFinished
            }))
            const todoData = await todoCol.find(filters).exec();
            if ( todoData.length === 0 )
                res.status(200).send([])
            else
                res.status(200).send(todoData)
        }
        else if ( req.method === "POST" ){
            const{
                task,
                priority,
                dueDate,
                done} = req.body;
            if ( !task || !priority || !dueDate || !done ){
                res.status(200).send({message:"Incomplete Data!"})
                return;
            }
            const todoData = new todoCol({task, priority, dueDate , done});
            await todoData.save();
            res.status(201).send({message:"Saved it!"})
        }
    }catch (err) {
        // res.status(400).send((err as Error).message);
    }
}


module.exports = handler