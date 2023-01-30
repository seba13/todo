
import {pool} from '../../../config/db.js'



export const getUserTask = async (idUser) => {


    const [rows, fields] = await pool.query('Select * from tasks where tasks.id_user=?',[idUser])

    return rows;

}