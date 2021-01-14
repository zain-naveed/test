import React, { useState } from 'react';
import {Form,Button,FormControl, Container,Card,Table,Row,Col} from 'react-bootstrap';
import {addTask,updateTask,listTask} from './action/TaskAction';
import {useDispatch,useSelector} from 'react-redux';
export default  function App(){
    const [task,setTask]= useState([]);
    const [note,setNote] = useState("");
    const [description,setDescription] = useState("");
    const [errorFor,setError] = useState("");
    const [errorMsg,setErrorMsg] = useState("");
    const [index,setIndex]= useState("");
    const [status,setStatus] = useState(false);
    const dispatch = useDispatch();
    const listData = JSON.parse(localStorage.getItem("task"));
    React.useEffect(()=>{
        dispatch(
        listTask()
        )
    },[listTask])
    const taskdata = useSelector(state=> state.Task);
    console.log("Task data",taskdata)
    const reSetError = ()=>{
        setError("");
        setErrorMsg("");
    }
    const validation = ()=>{
        if(note === ""){
            setError("note");
            setErrorMsg("Please Add the note");
            return false
        }else if(description === ""){
            setError("description");
            setErrorMsg("Please Add the description");
            return false
        }
        else{
            return true
        }
    }
    const handleSubmit = (e,ind,obj,str)=>{
        e.preventDefault();
        if(ind === 0 || ind){
            const rawClone = [...listData];
            setIndex(ind);
            if(Object.keys(obj).length > 0){
            setNote(obj.note);
            setDescription(obj.description);
            }
            rawClone[ind].note = note;
            rawClone[ind].description = description;
            setTask(rawClone);
           
            if(str === "update"){
                dispatch(
                    updateTask(rawClone)
                )
                setIndex("");
                setNote("");
                setDescription("");
            }
        
            console.log("index clicke submet")
        }else{
        const vali = validation();
        if(vali){
            const clonseTask = [...task];
            const   obj = {note:note,description:description, check:false}
           
              clonseTask.push(obj);
              setTask(clonseTask);
              
              dispatch(
                  addTask(clonseTask)
              )
              setNote("");
              setDescription("");
        }
        
    }
    }
    const handleCheck = (e,indx)=>{
       const rawCheck = [...listData];
        if(e.target.checked){
            rawCheck[indx].check = true;
            console.log(rawCheck)
            dispatch(
                updateTask(rawCheck)
            )
        }
        
    
    }
    console.log(task);
    return (
        <>
        <Container>
           <Card> 
               <Card.Header>Task Manager</Card.Header>
               <Card.Body>
        <Form>
            <Form.Group>
                <Form.Label>Note</Form.Label>
                <FormControl type="text" value={note} onChange={(e)=>{
                    setNote(e.target.value)
                    reSetError()
                
                 }} />
                {
                    errorFor === "note" && errorMsg !== "" ? <div className="alert alert-danger">
                        {
                            errorMsg
                        }
                    </div>:""
                }
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <FormControl type="text" value={description     } onChange={(e)=>{setDescription(e.target.value)
                reSetError()
                }} />
                {
                    errorFor === "description" && errorMsg !== "" ? <div className="alert alert-danger">
                        {
                            errorMsg
                        }
                    </div>:""
                }
            </Form.Group>
            <Button onClick={(e)=> {
                 index === 0 || index ? 
                 handleSubmit(e,index,{},"update"): handleSubmit(e)
            }}>
                {
                    index === 0 || index ? "Update":"Add"
                }
                
                </Button>
        </Form>
        </Card.Body>
        </Card>
        <Row>
            <Col sm={4}>
            <Table >
        <thead>
            <tr>
            <th>Pending</th>
                <th>Note</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        {
         taskdata.length > 0 ?   taskdata.map((obj,indx)=>{
             if(status ===  obj.check){
                return   <tbody key={indx}>
                <tr>
                <td>
                    <input type="checkbox"  onChange={(e)=>handleCheck(e,indx)} />
                </td>
            <td>
                <li>{obj.note}</li>
                </td>
                <td>
                <li>{obj.description}</li>
                </td>
                <td>
                    <i className="fas fa-edit" onClick={(e)=>handleSubmit(e,indx,obj)}></i>
                </td>
                </tr>
        
        </tbody>
             }
                
                
            
               
            }):""
        }
         </Table>
      
            
            </Col>
            <Col sm={4}>
            {
             taskdata.length > 0 &&   taskdata.find(i=>i.check === true) ?         <Table >
                <thead>
                    <tr>
                    <th>Complete</th>
                        <th>Note</th>
                        <th>Description</th>
                    
                    </tr>
                </thead>
                {
                 taskdata.length > 0 ?   taskdata.map((obj,indx)=>{
                     if( obj.check){
                        return   <tbody key={indx}>
                        <tr>
                        <td>
                            <span className="badge badge-success">Complete</span>
                        </td>
                    <td>
                        <li>{obj.note}</li>
                        </td>
                        <td>
                        <li>{obj.description}</li>
                        </td>
                        
                        </tr>
                
                </tbody>
                     }
                        
                        
                    
                       
                    }):""
                }
                 </Table>
             :""
            }
           
            
      </Col>
        </Row>
        </Container>
        </>
    )
}
 