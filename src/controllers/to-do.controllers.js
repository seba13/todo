import { getUser } from "./query/users/validityUser.js"
import {getUserTask, saveTask, modifyTask, modifyStatusTask, eliminateTask} from "./query/users/UserTasks.js"



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


export const NewTaskCtrl = async(req, res) => {



    const idTask = await saveTask({idUser: req.session.userId,...req.body})

    console.log(idTask);


    return res.json({
        message: "recibido",
        idTask,
    })
}

export const modifyTaskCtrl = async(req, res) => {


    const result = await modifyTask(req.body)
    return res.status(204).json({message: "tarea actualizada", result})

}

export const modifyStatusTaskCtrl = async(req, res) => {


    const result = await modifyStatusTask(req.body)


    return res.status(204).json({message: "tarea actualizada", result})
}


export const eliminateTaskCtrl = async(req, res) => {

    const result = await eliminateTask(req.body)


    return res.status(202).json({message: "tarea eliminada", result})

}