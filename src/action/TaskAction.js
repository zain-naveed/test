export const Add_Task = "Add_Task";
export const List_Task = "List_Task";
export const Update_Task = "Update_Task";

export const addTask = (data)=>dispatch=>{
    
    localStorage.setItem("task",JSON.stringify(data));
    dispatch({
        type:Add_Task
    })
    dispatch(
    listTask()
    )
}
export const listTask = ()=>dispatch=>{
    debugger;
  var data=  JSON.parse(localStorage.getItem("task"));
  console.log(data)
    dispatch({
        type:List_Task,
        payload:data
    })
}
export const updateTask = (data)=>dispatch=>{
    localStorage.setItem("task",JSON.stringify(data));
    dispatch({
        type:Update_Task
    })
    dispatch(
    listTask()
    )
}
