import pool from "../database/config.js";
import bcrypt from "bcrypt"
import { config } from "dotenv";
import  Jwt from "jsonwebtoken";
import {extname, join} from "path"
config()
class UserService{

    async register(body,files){
        const {username,password}=body
        const {file}=files
        let existUser=await pool.query("select * from users where username=$1",[username])
        // console.log(body,files);
        
        if(existUser.rowCount){
            return{
                status:404,
                message:"This user already existed"
            }
        };
        let passHash= await bcrypt.hash(password,10)
        let fileName= Date.now()+extname(file.name)

        let newUser= await pool.query("insert into users(username,password,avatar) values($1,$2,$3) RETURNING *",
            [username,passHash,fileName]
        )
         
        let uploads=join(
            process.cwd(),
            "src",
            "uploads",
            fileName
        )
        file.mv(uploads,(err)=>{
            if(err) return { status:500,message:"Upload error: ",err}
        })
        let id=newUser.rows[0].id
        return {
            status:201,
            message:"User is created",
            accesToken: Jwt.sign({id,username},process.env.JWT_SECRET)
        }
        
        

    }
    // async login(){

    // } 
    // async getAllUsers(){

    // }
}

export default new UserService