



export const redirectIndex = (req, res, next) => {
   

    const {userId} = req.session

    
    if(req.session.userId) {
        next()

    }else{
        res.redirect('/')
    }

}

export const redirectHome = (req, res, next) => {


    if(req.session.userId) {

        res.redirect('/home')

    }else {
        next()
    }

}