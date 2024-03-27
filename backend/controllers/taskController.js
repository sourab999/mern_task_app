const Task = require("../model/taskModel");

// taskcontroller is a file where we save call back functions.

const createTask=async(req,res)=>{
    try {
        const task=await Task.create(req.body);
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({msg:error.message})
        // 500 stands for internal server error
    }
}


const getTasks=async(req,res)=>{
    try {
        const tasks=await Task.find()
        res.status(200).json(tasks)

    } catch (error) {
        res.task(500).json({msg:error.message})

    }
}

const getTask=async(req,res)=>{
 
    try {
        const {id}=req.params
const task=await Task.findById(id)   
// what if the id is deleted from the database
if(!task){
return res.status(404).json(`no task is with id : ${id}`)

}

res.status(200).json(task)  
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
// console.log(req.params)
// res.send("get single task")
};

// delete task
const deleteTask= async(req,res)=>{
try {
    const {id}=req.params;
    const task=await Task.findByIdAndDelete(id)
if(!task){
    return res.status(404).json(`No task with id:${id}`);
}

    res.status(200).send("task  deleted")
} catch (error) {
    res.status(500).res.json({msg:error.message});
}
}

// update a task
const updateTask=async(req,res)=>{
try {
 const {id}=req.params;
 const task=await Task.findByIdAndUpdate(
    {_id:id},req.body,{
        new:true,
        runValidators:true,
    }
 ) ;
 res.status(200).json(task)  

} catch (error) {
    res.status(500).json({msg:error.message});
}
}


module.exports={
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}