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
        checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']")
        checkboxInputs.forEach(input => {

            if(input.checked == true){
                countDone++
            }
        })
    
        return countDone;
    },
    getInputPending(){
        let countPending = 0 
        checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']")
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


function toggleOptionsModal(e) {
   
        // btn para abrir/cerrar modal
        if(e.target.closest('[icon="fluent:options-20-filled"] ')){
    
            
            let taskListOptions = e.target.nextElementSibling
            

            console.log(e.target);
            console.log(taskListOptions);
           

            // previniendo que se abra mas de un modal
            // capturando todos los elementos que si estan visibles
            // se les agrega la clase hidden para ocultarlos
            // solo se le quita al elemento que se ha hecho click
            containerTask.querySelectorAll('.task-list__options__btn:not(.task-list__options__btn--hidden)').forEach(taskOptionsEl => {

                console.log("entra aca");
                taskOptionsEl.classList.add("task-list__options__btn--hidden")
    
            })

            // toggle para abrir y cerrar opciones
            taskListOptions.classList.toggle("task-list__options__btn--hidden")


            e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.setAttribute('readonly', true)

            e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.setAttribute('readonly', true)

            let iconSave = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:save-as']").parentElement
            iconSave.classList.add("task-list__icon--hidden")
            
            let iconEdit = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:edit-document']").parentElement
            iconEdit.classList.remove("task-list__icon--hidden")


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


            e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.setAttribute('readonly', true)

            e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.setAttribute('readonly', true)


            let iconSave = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:save-as']").parentElement
            iconSave.classList.add("task-list__icon--hidden")

            let iconEdit = e.target.closest(".task-list__options").querySelector("[icon='material-symbols:edit-document']").parentElement
            iconEdit.classList.remove("task-list__icon--hidden")

            console.log(iconSave);
            

        }
        else 
        if(e.target.getAttribute('icon') === 'material-symbols:edit-document' || e.target.getAttribute("icon") === "material-symbols:save-as"){

            if(e.target.getAttribute('icon') ==="material-symbols:edit-document"){

                e.target.parentElement.classList.toggle("task-list__icon--hidden")

                e.target.parentElement.nextElementSibling.classList.toggle("task-list__icon--hidden")


                e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.removeAttribute('readonly')

                e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild.removeAttribute('readonly')

                e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild.focus()
                
            }else
            {

                

                // se procede a guardar

                console.log("guardando....");

                e.target.parentElement.classList.toggle("task-list__icon--hidden")

                e.target.parentElement.previousElementSibling.classList.toggle("task-list__icon--hidden")




                let nombre = e.target.closest('.task-list__wrapper').firstElementChild.firstElementChild

                let descripcion = e.target.closest('.task-list__wrapper').firstElementChild.lastElementChild

                let idTask = e.target.closest(".task-list__wrapper").dataset.id


                saveTask(nombre.value, descripcion.value, idTask)
                

                createModalMessage({flag: true, title: "Actualizar tarea", message: "Tarea actualizada con éxito"})

            }

        }
        else
        if(e.target.getAttribute('icon') === 'material-symbols:delete-forever-rounded')
        {
            console.log("eliminado....");

            let idTask = e.target.closest(".task-list__wrapper").dataset.id

            deleteTask(idTask)

        }
    
}






function updateInfo(e) {

 
    checkboxInputs = containerTask.querySelectorAll("input[type='checkbox']")

    if(e.target.getAttribute('type') == 'checkbox'){
        

        let spanText = e.target.parentElement.lastElementChild


        console.log(spanText);

        updateTasksDone()
        updateTasksPending()
        updateTexttask(spanText, e.target)

        console.log("guardando estado....");


        saveStatus(e.target.getAttribute('id'), e.target.checked)
        createModalMessage({flag: true, title: "Actualizar tarea", message: "Estado de tarea Actualizado con Éxito"})
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
    .then(res => {

        if(res.status == 200) return res.json()
        else throw new Error('Something went wrong');
    })
    .then(json => {
        console.log({json});
        updateTasksList({op: 'append', ...json})
    })
    .catch(error => {
        console.log("hola");
    })
    console.log("enviando----");

    inputTitle.value = ""
    inputDescription.value = ""
}


function saveTask(nombre, descripcion, idTask) {


    let data = {nombre: nombre, descripcion: descripcion, idTask: idTask}


    fetch(`/to-do/${data.idTask}/`, {

        headers: {
            "Content-Type": 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data),

    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
    })


}


function saveStatus(id, status) {

    let estado = status ? 1 : 0 

    let data = {idTask: id, estado: estado}


    fetch(`/to-do/${data.idTask}/status`, {

        headers: {
            "Content-Type": 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify(data),

    })
    .then(res => res.json())
    .then(json => {
        
        console.log(json);
    })


}


function deleteTask(idTask) {

    let data = {idTask}
    
    fetch(`/to-do/${data.idTask}/`, {

        headers: {
            "Content-Type": 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify(data),

    })
    .then(res => {
        if (res.ok) {
            return res.json()
        }else
        {
            throw new Error('Error al eliminar tarea')
        }
    })
    .then(json => {
        
        // se procede a eliminar

        console.log("acaa");

        let wrapperTask = document.querySelector(` .task-list__wrapper[data-id='${idTask}']`)
        wrapperTask.remove()
        createModalMessage({flag: true, title: "Eliminar tarea", message: "Tarea Eliminada con Éxito"})
        updateTasksDone()
        updateTasksPending()
        createDockPage()

    })
    .catch(err => console.log(err))


}


function updateTasksList(data) {

    console.log(data);
    if(data.op === 'append') {


        taskList.append(createTask(data))
        createModalMessage({flag: true, title: "Agregar Tarea", message: "Tarea Creada con Éxito"})
        updateTasksDone()
        updateTasksPending()
        createDockPage()
    }

}


function createTask(data) {

    let taskListWrapper = document.createElement("div")
    taskListWrapper.classList.add('task-list__wrapper')
    taskListWrapper.setAttribute('data-id', data.idTask)

    let taskListElementInput = document.createElement("div")
    taskListElementInput.classList.add("task-list__element")

    taskListWrapper.append(taskListElementInput)


    let inputTitle = document.createElement("input")
    inputTitle.classList.add("task-list__title")
    inputTitle.setAttribute("type", "text")
    inputTitle.setAttribute("name", "nombre")
    inputTitle.setAttribute("value", data.nombre)
    inputTitle.setAttribute('readOnly', true)


    let inputDescription = document.createElement("input")
    inputDescription.classList.add("task-list__description")
    inputDescription.setAttribute("type", "text")
    inputDescription.setAttribute("name", "descripcion")
    inputDescription.setAttribute("value", data.descripcion)
    inputDescription.setAttribute('readOnly', true)

    taskListElementInput.appendChild(inputTitle)
    taskListElementInput.appendChild(inputDescription)

    let taskListElementOptions = document.createElement("div")
    taskListElementOptions.classList.add("task-list__element")

    taskListWrapper.append(taskListElementOptions)

    let taskListOptions = document.createElement("div")
    taskListOptions.classList.add("task-list__options")

    taskListElementOptions.append(taskListOptions)

    let iconOpenOptions = document.createElement("iconify-icon")
    iconOpenOptions.setAttribute('icon', 'fluent:options-20-filled')

    taskListOptions.append(iconOpenOptions)


    //Contenedor Botones de opciones
    let taskListOptionsButtons = document.createElement("div")
    taskListOptionsButtons.classList.add("task-list__options__btn","task-list__options__btn--hidden")

    let divCloseOptions = document.createElement("div")
    divCloseOptions.classList.add("task-list__icon--close")

    let iconCloseOptions = document.createElement("iconify-icon")
    iconCloseOptions.classList.add("btn__close-options")
    iconCloseOptions.setAttribute("icon", "material-symbols:close")

    
    divCloseOptions.append(iconCloseOptions)
    taskListOptionsButtons.append(divCloseOptions)

    taskListOptions.append(taskListOptionsButtons)

    let divEditIcon = document.createElement("div")
    divEditIcon.classList.add("task-list__icon")

    let iconEdit = document.createElement("iconify-icon")
    iconEdit.setAttribute("icon", "material-symbols:edit-document")

    let spanEdit = document.createElement("span")
    spanEdit.textContent = 'Editar'

    divEditIcon.append(iconEdit)
    divEditIcon.append(spanEdit)

    taskListOptionsButtons.append(divEditIcon)


    let divSaveIcon = document.createElement("div")
    divSaveIcon.classList.add("task-list__icon", "task-list__icon--hidden")

    let iconSave = document.createElement("iconify-icon")
    iconSave.setAttribute("icon", "material-symbols:save-as")

    let spanSave = document.createElement("span")
    spanSave.textContent = 'Guardar'

    divSaveIcon.append(iconSave)
    divSaveIcon.append(spanSave)

    taskListOptionsButtons.append(divSaveIcon)



    let divCheckBox = document.createElement("div")
    divCheckBox.classList.add("task-list__icon")

    taskListOptionsButtons.append(divCheckBox)


    let checkboxWrapper = document.createElement("div")
    checkboxWrapper.classList.add("checkbox-wrapper")

    
    divCheckBox.appendChild(checkboxWrapper)
    
    let inputCheckbox = document.createElement("input")
    inputCheckbox.setAttribute("type", "checkbox")
    inputCheckbox.setAttribute("id", data.idTask)
    inputCheckbox.checked = data.estado ? true: false
    inputCheckbox.value='done'

    let labelCheckbox = document.createElement("label")
    labelCheckbox.setAttribute("for", data.idTask)

    let spanButtonCheckbox = document.createElement("span")
    spanButtonCheckbox.classList.add("circle")

    let spanText = document.createElement("span")
    spanText.textContent = inputCheckbox.checked ? 'Realizado' : 'Pendiente'

    labelCheckbox.append(spanButtonCheckbox)

    checkboxWrapper.append(inputCheckbox)
    checkboxWrapper.append(labelCheckbox)
    checkboxWrapper.append(spanText)



    let divDeleteIcon = document.createElement("div")
    divDeleteIcon.classList.add("task-list__icon")

    let iconDelete = document.createElement('iconify-icon')
    iconDelete.setAttribute('icon', 'material-symbols:delete-forever-rounded')

    let spanDelete = document.createElement("span")
    spanDelete.textContent = "Eliminar"


    divDeleteIcon.append(iconDelete)
    divDeleteIcon.append(spanDelete)

    taskListOptionsButtons.append(divDeleteIcon)


    return taskListWrapper

}




function updateTexttask(span, checkbox) {

    span.textContent = checkbox.checked? 'Realizada' : 'Pendiente'

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