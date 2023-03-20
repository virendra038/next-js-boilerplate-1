import {Types} from 'mongoose'
import todoCollection from '@/database/todoSchema'

export const isPastDate = (dueDate: string)=>{
    const todayDate = new Date()
    const givenDate = new Date(dueDate)
    todayDate.setHours(0,0,0,0)  
    givenDate.setHours(0,0,0,0)  
    if ( givenDate.getTime() >= todayDate.getTime() )
        return false;
    return true;
}

export const isIdValid =  async (id: string) => {
    if(Types.ObjectId.isValid(id)){
        if((String)(new Types.ObjectId(id)) === id){
            const _id = new Types.ObjectId(id);
            const todoData = await todoCollection.findById({_id})
            if ( todoData ) return true;
        }
    }
    return false;
}