

import {pool} from '../../../config/db.js'



export const getUserTask = async (idUser) => {


    const [rows, fields] = await pool.query('Select * from tasks where tasks.id_user=? and tasks.eliminated=0',[idUser])

    return rows;

}


export const saveTask = async ({idUser, nombre, descripcion}) => {

    // task = {titulo, descripcion}

    const [rows, fields] = await pool.query('Insert into tasks(id_user,nombre, descripcion) values (?,?,?)',[idUser,nombre, descripcion])

    return rows.insertId;

}


export const modifyTask = async ({idTask, nombre, descripcion}) => {

    const [rows, fields] = await pool.query('Update tasks set nombre=?, descripcion=? where id_task=?;',[nombre,descripcion,idTask])


    return rows;

}

export const modifyStatusTask = async ({idTask, estado}) => {

    try{
        const [rows, fields] = await pool.query('Update tasks set estado=? where id_task=?;',[estado,idTask])

        return rows;

    }catch(err){
        return err;
    }
}

export const eliminateTask = async({idTask}) => {

    try{
        const [rows, fields] = await pool.query('update tasks set eliminated=1 where id_task=?;',[idTask])

        return rows;
    }catch(err) {
        console.log(err);
        return err;
    }
}
