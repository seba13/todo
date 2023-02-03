



let modalMessage = document.getElementById('modal-message')



if(modalMessage) {
    modalMessage.addEventListener('animationend', (e) => {

        if(e.animationName == 'hide') {
            e.target.remove()
        }
    })
}

