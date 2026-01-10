import pool from "../database/config.js";
import bcrypt from "bcrypt"
import { config } from "dotenv";
import  Jwt from "jsonwebtoken";
import {extname, join} from "path"
import { passwordHash } from "../utils/bcrypt.js";
import { ConflictError, InternalServerError } from "../utils/error.js";
config()
class UserService{

    async register(body,files){
        console.log(a);
        const {username,password}=body
        const {file}=files
        let existUser=await pool.query("select * from users where username=$1",[username])
        
        
        if(existUser.rowCount){
            throw new ConflictError(409,"This user already existed")
        };
        
        
        let passHash= await passwordHash(password)
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
            if(err) throw new InternalServerError(500,err)
        })
        let id=newUser.rows[0].id
        return {
            status:201,
            message:"User is created",
            accesToken: Jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'10m'}),
            refreshToken:Jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'10m'})
        }
        
        

    }
    // async login(){

    // } 
    // async getAllUsers(){
        
    // }
}

export default new UserService