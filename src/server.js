import express from "express"
import { config } from "dotenv"
import fileUpload from "express-fileupload"
import userRouter from "./routers/users.routes.js"
import fs from "fs"
import { join } from "path"
config()

const app=express()
app.use(express.json())
app.use(fileUpload())
app.use(userRouter)

app.use((error,req,res,next)=>{
    if(error.status<500){
        return res.status(error.status).json({
            status:error.status,
            message:error.message,
            name:error.name
        })
    }
   
    
    else{
        let errorText=`[${new Date()}]--${req.method}--${req.url}--${error.message}`
        
        
        fs.appendFileSync(join(process.cwd(),'src','logs','logger.txt'),errorText+"\n") 
        return res.status(error.status).json({
            status:500,
            message:"InternalServerError"
        })
    }
    
})
    



app.listen(process.env.PORT,()=>{console.log("Server is running...");})
