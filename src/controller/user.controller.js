
import usersService from "../service/users.service.js";

class UserController{
   async register(req,res,next){
      try {
         
         
         
         const data= await usersService.register(req.body,req.files)
         if(data){
            return res.status(data.status).json(data)
         }
         
      } catch (error) {
         // console.log(error.status,error.message);
         return next(error)      
      }
     
   }
}


export default new UserController
