


const renderIndex = (request, response) => {

    
    // clearCookie elimina la propiedad
    // return response.clearCookie('user').render('./index');
    const {userId} = request.session;

    console.log(userId);

    return response.render('./index');


}

export {renderIndex}