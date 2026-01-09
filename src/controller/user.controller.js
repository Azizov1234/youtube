
import usersService from "../service/users.service.js";

class UserController{
   async register(req,res){
        const data= await usersService.register(req.body,req.files)
        res.status(data.status).send(data)
        
   }
}
export default new UserController
 