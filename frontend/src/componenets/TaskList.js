import React, { useEffect, useState } from 'react'
import { Taskform } from './Taskform'
import { Task } from './Task'
// import { toast } from 'react-toastify'

// import { create } from 'domain'
// http:localhost:2000/api/tasks
import loadingImg from '../assests/loader.gif.url'
import axios from 'axios';
import { URL } from '../App';

export const TaskList = () => {
    const [isEditing,setIsEditing]=useState(false)
    const [taskID,setTaskID]=useState("")
    
    
const [tasks,setTasks]=useState([])
const [completedTasks,setcompletedTasks]=useState([])   
 const [isLoading,setIsLoading]=useState(false)
const [formData, setFormData] = useState({
name:"",
completed:false

    })
const {name}=formData

const handleInputChange=(e)=>{
const {name,value}=e.target;
setFormData({...formData,[name]:value})
}

const getTasks=async()=>{
    setIsLoading(true)
    try{
     const {data} = await axios.get(`${URL}/api/tasks`)
    setTasks(data)
     setIsLoading(false)
    }catch(error){
        alert(error.message)
        console.log(error)
        setIsLoading(false)
    }
}
useEffect(()=>{
getTasks()
},[])


const createTask=async(e)=>{
e.preventDefault()
console.log(formData)

if(name === ""){
    // return toast.error("input field cannot be empty")
    return alert("add the task")
    

}

try {
    // await axios.post("http://localhost:2000/api/tasks",formData)

    await axios.post(`${URL}/api/tasks`,formData)
    alert("task added sucessfully")

    setFormData({...formData,name:""})
getTasks();

} catch (error) {
    alert(error.message)
    console.log(error)
}


}

const deleteTask=async(id)=>{
 try{
 await axios.delete(`${URL}/api/tasks/${id}`)
 getTasks()
 }  catch(error){
alert(error.message)
 } 
}

useEffect(()=>{
const cTask=tasks.filter((task)=>{
    return task.completed === true
})
setcompletedTasks(cTask)
},[tasks])

const getSingleTask=async(task)=>{
setFormData({name:task.name,completed:false})
setTaskID(task._id)
setIsEditing(true)
}


const updateTask= async(e)=>{
e.preventDefault()
if (name === ""){
return alert("input field cannot be empty")
}
try {
    await axios.put(`${URL}/api/tasks/${taskID}` ,formData)
    setFormData({...formData,name:""})
    setIsEditing(false)
    getTasks()
} catch (error) {
    alert(error.message);
}
}

const setToComplete=async(task)=>{
const newFormData={
    name:task.name,
    completed:true,   
}
try {
    await axios.put(`${URL}/api/tasks/${task._id}`,newFormData )
    getTasks()
} catch (error) {
    alert(error.message)
    
}


}

  return (
    <div>
<h2>Task Manager</h2>
<Taskform name={name} handleInputChange={handleInputChange} createTask={createTask}
isEditing={isEditing} updateTask={updateTask}
/>
{tasks.length >0  && (

<div className='--flex-between --pb'>
<p>
    <b>Total Tasks:</b>{tasks.length}
</p>
<p>
    <b>Completed Tasks:</b>
    {completedTasks.length}
</p>
</div>


) }

<hr/>
{
    isLoading && (
    <div className='--flex-center'>
 <img src={loadingImg} alt='Loading'/>
        </div> 
    )
}
{

!isLoading && tasks.length===0?(
<p>to task added.plese add a task</p>

):(
<>
{
    tasks.map((task,index)=>{
        return(

<Task 
key={task._id} 
task={task} 
index={index} 
deleteTask={deleteTask} 
getSingleTask={getSingleTask}
setToComplete={setToComplete}
/>


        )
    })
}

</>

)

}
    </div>
  )
}
