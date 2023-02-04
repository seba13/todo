let containerTask = document.querySelector(".container-tasks")
let checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']")
let taskList = document.getElementById("task-list")
let taskDock = document.getElementById("task-dock")
let pages = 0;
let tasksDone = document.getElementById('tasks-done') 
let taskPending = document.getElementById("tasks-pending")

let buttonLeft = document.getElementById("button-left")
let buttonRight = document.getElementById("button-right")

let buttonNewTask = document.querySelector(".task__input-insert")
let modalForm = buttonNewTask.querySelector('.task__form-insert')

let inputInfo = {

    total: checkboxInputs.length,
    
    getInputDone(){
        let countDone = 0 
        checkboxInputs.forEach(input => {

            if(input.checked == true){
                countDone++
            }
        })
    
        return countDone;
    },
    getInputPending(){
        let countPending = 0 
        checkboxInputs.forEach(input => {
    
            if(! input.checked == true){
                countPending++
            }
        })
        return countPending;
    }
}

buttonNewTask.addEventListener('click', modalNewTask)
modalForm.addEventListener('submit', addNewTask)
// funcionalidad modal options
containerTask.addEventListener('click', toggleOptionsModal)



containerTask.addEventListener("change", updateInfo)

// Agregar info task
tasksDone.addEventListener('load', updateTasksDone())
taskPending.addEventListener('load', updateTasksPending())


// Agregar dock
taskDock.addEventListener("load", createDockPage())


// seleccionar dot del dock
document.addEventListener("resize", pageSelected)
taskList.addEventListener("scroll", pageSelected)


// evento scrollear al dot del dock seleccionado
taskDock.addEventListener("click", movePageAt)


// agregar bottones para scrollear
buttonLeft.addEventListener("click", ()=> {
    taskList.scrollBy({
        top: 0,
        left: -10,
        behavior: "smooth",
    })
})

buttonRight.addEventListener("click", ()=> {
    taskList.scrollBy({
        top: 0,
        left: 10,
        behavior: "smooth",
    })
})



function modalNewTask(e) {


    if(e.target.classList.contains("new-task") || e.target.getAttribute('icon')){

        if(modalForm){

            modalForm.classList.toggle('task__form-insert--hidden')
        }
    }


}

function addNewTask(e) {
    e.preventDefault()

    modalForm.classList.toggle('task__form-insert--hidden')

    let inputTitle = document.getElementById('title-task')
    let inputDescription = document.getElementById('description-task')

        
    // /to-do/newtask
    
    let data = {
        nombre: inputTitle.value,
        descripcion: inputDescription.value,
    }

    fetch('to-do/newtask', {

        headers: {
            "Content-Type": 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data),

    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
    })
    console.log("enviando----");

    inputTitle.value = ""
    inputDescription.value = ""
}



function toggleOptionsModal(e) {
   
        // btn para abrir/cerrar modal
        if(e.target.closest('[icon="fluent:options-20-filled"] ')){
    
            
            let tasklistOptions = e.target.nextElementSibling
    
           

            // previniendo que se abra mas de un modal
            // capturando todos los elementos que si estan visibles
            // se les agrega la clase hidden para ocultarlos
            // solo se le quita al elemento que se ha hecho click
            containerTask.querySelectorAll('.task-list__options__btn:not(.task-list__options__btn--hidden)').forEach(taskOptionsEl => {

                console.log("entra aca");
                taskOptionsEl.classList.add("task-list__options__btn--hidden")
    
            })

            // toggle para abrir y cerrar opciones
            tasklistOptions.classList.toggle("task-list__options__btn--hidden")
    
    
        }else
        if(e.target.closest('.task-list__icon--close') ){
            
            let btnClose = null

            if(e.target.classList.contains("task-list__icon--close")){
                 btnClose = e.target
            }else
            {
                btnClose = e.target.parentElement
            }

            let tasklistOptions = btnClose.parentElement

            tasklistOptions.classList.add("task-list__options__btn--hidden")
        }
        else 
        if(e.target.getAttribute('icon') === 'material-symbols:edit-document' || e.target.getAttribute("icon") === "material-symbols:save-as"){

            if(e.target.getAttribute('icon') ==="material-symbols:edit-document"){

                e.target.parentElement.classList.toggle("task-list__icon--hidden")

                e.target.parentElement.nextElementSibling.classList.toggle("task-list__icon--hidden")

            }else
            {

                // se procede a guardar

                console.log("guardando....");

                e.target.parentElement.classList.toggle("task-list__icon--hidden")

                e.target.parentElement.previousElementSibling.classList.toggle("task-list__icon--hidden")
            }

        }
        else
        if(e.target.getAttribute('icon') === 'material-symbols:delete-forever-rounded')
        {
            console.log("eliminado....");
        }
    
}



function updateInfo(e) {

 
    checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']")

    if(e.target.getAttribute('type') == 'checkbox'){
        
        updateTasksDone()
        updateTasksPending()


        console.log("guardando estado....");
    }

}

function updateTasksDone() {
    let tasksDone = document.getElementById('tasks-done')   

    if(tasksDone){
        tasksDone.textContent = inputInfo.getInputDone()
    }
}

function updateTasksPending() {
    

    if(taskPending)
    {
        taskPending.textContent = inputInfo.getInputPending()
    }
}





// determina cuantas paginas de scroll hay

function pageSelected() {

 
   

    pages = Math.round(taskList.scrollWidth / taskList.offsetWidth);

    
    // redondea el width a un numero entero de la ventana de tareas
    let offsetWidth = Math.floor(taskList.scrollWidth / pages)


    // dot actual
    let index = Math.round(taskList.scrollLeft / offsetWidth)
    
    
    // se le aplican las clases al dock seleccionado
    selectDock(index)

}

function createDockPage() {

    let length = Math.round(taskList.scrollWidth / taskList.offsetWidth);


    let fragment = document.createDocumentFragment()
    for(let i = 0; i< length; i++) {

        let circle = document.createElement("span")
        circle.classList.add("task-dock__circle")

        fragment.append(circle)
    } 

    if(taskDock)
    {
        while(taskDock.firstChild) {

            taskDock.removeChild(taskDock.firstChild);

        }

        taskDock.append(fragment)
    }

    pageSelected()

}


function selectDock(index){

    let docks = document.querySelectorAll('.task-dock__circle')

    console.log("entra acá");


    if(docks && docks.length > 0){
        docks.forEach(function(dock){
        
            dock.classList.remove("task-dock__circle--active")
    
        })

        console.log(index);
    
        docks[index].classList.add("task-dock__circle--active")
    }

}



function movePageAt(e) {


    let nextIndex = -1
    let currentIndex = -1

    if(e.target.classList.contains('task-dock__circle'))
    {

        if(!e.target.classList.contains('task-dock__circle--active')){

            let selectedDot = e.target
            let currentDot = taskDock.querySelector(".task-dock__circle--active")

            let dots = [...document.querySelectorAll(".task-dock__circle")]

            if(dots && dots.length>0){
    
                nextIndex = dots.indexOf(selectedDot)
                
                currentIndex = dots.indexOf(currentDot)

                console.log(nextIndex);
                console.log(currentIndex);

                let desplazamiento = -1
                let width = taskList.offsetWidth
                
                if(nextIndex > currentIndex){
                    desplazamiento = nextIndex - currentIndex

                    

                    taskList.scrollBy({
                        top: 0,
                        left: width*desplazamiento,
                        behavior: "smooth",
                    })


                }else
                {
                    desplazamiento =  -1*(currentIndex - nextIndex)

                    taskList.scrollBy({
                        top: 0,
                        left: width*desplazamiento,
                        behavior: "smooth",
                    })
                }

                console.log(desplazamiento);

            }

        }


    }


}