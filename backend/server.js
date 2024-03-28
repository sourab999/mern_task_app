const dotenv=require('dotenv').config() 
const express=require('express')
 const connectDB=require('./config/connectDB')
const mongoose=require("mongoose")
const Task=require("./model/taskModel")
const taskRoutes=require('./routes/taskRoute')
 const app=express()
const cors=require("cors")
//  connectDB()


// middleware
app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use(cors());
app.use(cors({
    origin :[ "http://localhost:3000",'https://mern-task-app.onrender.com' ]
}))
app.use("/api/tasks",taskRoutes)

// const logger=(req,res,next)=>{
//     console.log("middleware run")
//     console.log(req.method)
//     next()
// }


//Routes
app.get('/',(req,res)=>{
    res.send("home page ")

})

// create a task
// app.post('/api/tasks',async(req,res)=>{
// console.log(req.body)
// res.send("task created")

// })


  
    


 const PORT=process.env.PORT || 2000
 
 
const startserver=async()=>{
    try {
        await connectDB()
        app.listen(PORT,()=>{
            console.log(`server running on port ${PORT}`)
         })
    } catch (error) {
        console.log(error)
    }
}
startserver();








//  mongodb+srv://sourab1234:<password>@atlascluster.yqhayu9.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster