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

// type validationCheckType = ({ task: string|undefined; priority: string|undefined; dueDate: string|undefined; done: boolean|undefined}) => any
export const validationChecks = ({ task, priority, dueDate, done}) =>{
    let errorMessage: string = '';
    if ( task === undefined )
        errorMessage += 'task is not provided, ';
    if ( dueDate === undefined )
        errorMessage += 'dueDate is not provided, ';
    if ( priority === undefined )
        errorMessage += 'priority is not provided, ';
    if ( done === undefined )
        errorMessage += 'done is not provided, ';
    if ( dueDate && isPastDate(dueDate) )
        errorMessage += 'due date cannot be past date, '
    return errorMessage;
}