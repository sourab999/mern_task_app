const express=require('express')
const Task=require("../model/taskModel")
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController')
const router=express.Router()

// router.route('/').get(getTasks).post(createTask)


//create a task

router.post('/',createTask)

  //get/read tasks
  router.get("/",getTasks)
  router.get("/:id",getTask)
  router.delete("/:id",deleteTask)
  router.put("/:id",updateTask)




module.exports=router