
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(join(__filename))

/**
 * funcion que elimina el logo de usuario antiguo 
 * cuando cambia de avatar
 * @param {*} filename  
 */
export const removeLogoUser = (fileName)=>{

    const dir = join(__dirname, '../public/uploads')

    fs.readdir(dir, (err, files) => {
        
        console.log("entra aca file");

        files.forEach(file => {
            let name = file.split('.').slice(0,-1).join('')
            if(fileName === name) {
                fs.unlink(join(dir,file), err=> {
                    console.log(err);
                })
            }

        })
    })


}