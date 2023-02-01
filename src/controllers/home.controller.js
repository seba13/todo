import { getUser } from "./query/users/validityUser.js"



/**
 * funcion controladora que renderiza el home de un usuario con autenticación
 * de sesion, en caso de no tener autenticacion valida lo redirecciona a la plantilla index
 * @param {request} req 
 * @param {response} res 
 */
export const renderHome = (req, res) => {
    // console.log(req.cookies.user);

    // let userData = req.session.user_data
    // delete req.session.user_data


    // console.log("recibiendo req.session.user: " + JSON.stringify(userData));


    // console.log(req.flash('info'));


    // if(req.cookies.user.username === 'admin') {
        
    //     return res.render("./home",{
    //         // req.cookies lee la propiedad de cookie
    //         // user: req.cookies.user

    //         // al llamar a req.flash se elimina de la memoria flash los datos
    //         // message : req.flash("info")
    //     });
    // }else{
    //     return res.status(403).redirect('/')
    // }

    if(req.session.userId) {

        getUser(req.session.userId)
            .then(user => {

                if(user) {  
                    return res.render('./home', {
                        user: user,
                    })
                }else {
                    return res.status(403).redirect('/')
                }

            })
    }
}