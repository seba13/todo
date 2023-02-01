import { getUser } from "./query/users/validityUser.js"
import {getUserTask} from "./query/users/getUserTasks.js"



/**
 * funcion controladora que renderiza la plantilla to-do 
 * @param {request} req 
 * @param {response} res 
 */
export const renderTodo = (req, res) => {


    if(req.session.userId) {
    
        getUser(req.session.userId)
        .then(user => {

            if(user){

                getUserTask(user.id)
                    .then(tasks => {
                        console.log(tasks);
                        return res.render('./to-do', {
                            user,
                            tasks
                        })

                    })
            }else {
                res.redirect('/')
            }

        })

    
    }

    

}