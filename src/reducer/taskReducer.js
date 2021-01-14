import initialState from './initialState';
import * as Task from '../action/TaskAction';

export const TaskReducer = (state=initialState,action)=>{
    switch(action.type){
        case Task.Add_Task:
            return state;
        case Task.List_Task:
            state.ListTask = action.payload === null ? []: action.payload;
            return state.ListTask;
        case Task.Update_Task:
            state.ListTask = action.payload === null ? []: action.payload;
            return state;
        default:
            return state;

    }
}