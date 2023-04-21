import './index.css';
import Storage from './modules/Storage'
import TodoList from './modules/TodoList';
import Category from './modules/Category'
import Task from './modules/Task'
const { v4: uuidv4 } = require('uuid');
/*
function headerComponent() {
    const element = document.createElement('ul');
    element.setAttribute("id","navlist")
    const home = document.createElement('li');
    const menu = document.createElement('li');
    const contact = document.createElement('li');

    home.innerHTML = 'Home'
    menu.innerHTML = 'Menu'
    contact.innerHTML = 'Contact'

    home.setAttribute("id","nav-home")
    menu.setAttribute("id","nav-menu")
    contact.setAttribute("id","nav-contact")

    home.setAttribute("class","navlist-item navlist-item-active")
    menu.setAttribute("class","navlist-item")
    contact.setAttribute("class","navlist-item")

    home.onclick = function () {navMenuOnClick(home,'home')};
    menu.onclick = function () {navMenuOnClick(menu,'menu')};
    contact.onclick = function () {navMenuOnClick(contact,'contact')};
    element.append(home,menu,contact)

    return element;
}


function navMenuOnClick(element,menuName) {
    
    const activeClassName = "navlist-item-active"
    const active = document.querySelector(".navlist-item-active")
    if(active)
        active.classList.remove(activeClassName)
    if(menuName == 'home')
    {
        element.classList.add(activeClassName)
        loadHome();
    }
    else if (menuName == 'menu'){
        element.classList.add(activeClassName)
        loadMenu();
    }
    else if (menuName == 'contact'){
        element.classList.add(activeClassName)
        loadContact();
    }
}
*/

function selectCategory(element,category) {
    const currentCategory = document.getElementById('task-category-label')
    currentCategory.innerHTML = category;
    const activeClassName = "task-category-active"
    const active = document.querySelector(".task-category-active")
    if(active)
        active.classList.remove(activeClassName)

    element.classList.add(activeClassName)

    UI.loadTasks(category)
}

function detailsFunction(task) {
    alert('detailsbuttonclick')
}
function editFunction(task) {
    alert('editbuttonclick')
}
function deleteFunction(categoryName,taskId) {
    Storage.deleteTask(categoryName,taskId)
    const currentCategory = document.getElementById('task-category-label').innerHTML
    UI.loadTasks(currentCategory)
}

function addNewCategory(){
    const newCategory = document.getElementById("category-name").value
    if(newCategory == '') {
        alert('Please enter a category name.') 
    }
    else {
        const todoList = Storage.getTodoList()
        todoList.addCategory(new Category(newCategory))
        UI.createCategory(newCategory)
        Storage.saveTodoList(todoList)
        closeCategoryModal()
    }
}

function openCategoryModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block"
}

function closeCategoryModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none"
}

function addNewTaskOpenModal() {
    const currentCategory = document.getElementById('task-category-label').innerHTML
    const taskModal = document.getElementById("newTaskModal");
    taskModal.style.display = "block"
}
function closeTaskModal() {
    const taskModal = document.getElementById("newTaskModal");
    taskModal.style.display = "none"
}

function addNewTask() {
    const selectedCategory = document.getElementById('task-category-dropdown').value;
    const newTask = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    if(newTask == "" || selectedCategory == "" || taskDate == "") {
        alert('Please add all details.')
    }
    else {
        const taskId = uuidv4()
        Storage.addTask(selectedCategory,new Task(taskId,newTask,taskDate,false));
        UI.createTask(taskId,newTask,taskDate,false,selectedCategory);
        closeTaskModal();
    }
}

window.onclick = function(event) {
    const categoryModal = document.getElementById("myModal");
    const taskModal = document.getElementById("newTaskModal");
    if (event.target == categoryModal) {
        categoryModal.style.display = "none";
    }
    if (event.target == taskModal) {
        taskModal.style.display = "none";
    }
  }
function loadComponent() {
    const element = document.createElement('div');
    element.classList.add('main-container')
    const mainContainerHeader = document.createElement('div')
    const mainContainerBody = document.createElement('div')
    //Left Task Menu
    const taskCategoryList = document.createElement('div')
    const taskCategoryListUL = document.createElement('ul')
    const allTasksLI = document.createElement('li')
    const todayLI = document.createElement('li')
    const categorizedTaskLI = document.createElement('li')
    const categorizedTaskUL = document.createElement('ul')
    const categorizedTaskGym = document.createElement('li')
    const categorizedTaskStudy = document.createElement('li')
    const categorizedTaskWork = document.createElement('li')

    //Main Tasks
    const taskContainer = document.createElement('div')
    
    mainContainerHeader.setAttribute('class','main-container-header');
    mainContainerHeader.innerHTML = 'To Do List'

    mainContainerBody.setAttribute('class','main-container-body');

    taskCategoryList.setAttribute('class','task-category-list')
    taskCategoryList.setAttribute('id','task-category-list')

    allTasksLI.setAttribute('class','task-category-item task-category-active')
    //allTasksLI.innerHTML = '<span>All Tasks</span><span class="notification-circle">2</span>'
    allTasksLI.innerHTML = '<span>All Tasks</span>'
    allTasksLI.onclick = function() {selectCategory(allTasksLI,'All')}

    todayLI.setAttribute('class','task-category-item')
    todayLI.innerHTML = '<span>Today</span>'
    todayLI.onclick = function() {selectCategory(todayLI,'Today')}

    categorizedTaskLI.setAttribute('class','task-category-item')
    categorizedTaskLI.innerHTML = '<span>Categorized Task</span>'

    /*categorizedTaskGym.setAttribute('class','task-category-item')
    categorizedTaskGym.innerHTML = '<span>Gym</span>'
    categorizedTaskGym.onclick = function() {selectCategory('gym')}

    categorizedTaskStudy.setAttribute('class','task-category-item')
    categorizedTaskStudy.innerHTML = '<span>Study</span>'
    categorizedTaskStudy.onclick = function() {selectCategory('study')}

    categorizedTaskWork.setAttribute('class','task-category-item')
    categorizedTaskWork.innerHTML = '<span>Work</span>'
    categorizedTaskWork.onclick = function() {selectCategory('work')}*/

    taskContainer.setAttribute('class','tasks-container');
    taskContainer.setAttribute('id','task-container');
    categorizedTaskUL.setAttribute('id','task-category-list-ul')


    /*Task Label and Button */
    const taskHeader = document.createElement('div')
    taskHeader.setAttribute('class','task-container-header')
    const taskCategoryLabel = document.createElement('span')
    taskCategoryLabel.setAttribute('id','task-category-label')
    const addTaskButton = document.createElement('button')
    addTaskButton.setAttribute('class','task-button add-task-button')
    taskCategoryLabel.innerHTML = 'All';
    addTaskButton.innerHTML = 'Add New Task'
    addTaskButton.onclick = function() {addNewTaskOpenModal()}

    taskHeader.append(taskCategoryLabel,addTaskButton)

    //resuse this on loop later?
    /*const taskItem = document.createElement('div')
    const taskItemLeft = document.createElement('div')
    const taskItemDetails  = document.createElement('span')
    const taskItemCheckBox  = document.createElement('input')
    const taskItemRight = document.createElement('div')
    const taskItemDetailsButton = document.createElement('button')
    const taskItemDate = document.createElement('span')
    const taskItemEditButton = document.createElement('button')
    const taskItemDeleteButton = document.createElement('button')

    taskItem.setAttribute('class','task-item')
    taskItemCheckBox.setAttribute('type','checkbox')
    taskItemCheckBox.setAttribute('class','task-checkbox')
    taskItemDetails.innerHTML = 'Task 1 Temp'

    taskItemDetailsButton.setAttribute('class','task-button task-button-details')
    taskItemEditButton.setAttribute('class','task-button task-button-edit')
    taskItemDeleteButton.setAttribute('class','task-button task-button-delete')
    taskItemDetailsButton.innerHTML = 'Details'
    taskItemDate.innerHTML = '04/20/2023'
    taskItemEditButton.innerHTML = 'Edit'
    taskItemDeleteButton.innerHTML = 'Delete'

    taskItemDetailsButton.onclick = function() {detailsFunction('1')}
    taskItemEditButton.onclick = function() {editFunction('1')}
    taskItemDeleteButton.onclick = function() {deleteFunction('1')}


    taskItemLeft.append(taskItemCheckBox,taskItemDetails)
    taskItemRight.append(taskItemDetailsButton,taskItemDate,taskItemEditButton,taskItemDeleteButton)
    taskItem.append(taskItemLeft,taskItemRight)
*/
    taskContainer.append(taskHeader)

    //categorizedTaskUL.append(categorizedTaskGym,categorizedTaskStudy,categorizedTaskWork)
    taskCategoryListUL.append(allTasksLI,todayLI,categorizedTaskLI,categorizedTaskUL)

    

    /*Add Category Button*/
    const showCategoryModalButton = document.createElement('button')
    showCategoryModalButton.setAttribute('class','button-add-category')
    showCategoryModalButton.onclick = function () {openCategoryModal()};
    showCategoryModalButton.innerHTML = 'Add new Category'

    const categoryFieldModal = document.createElement('div')
    categoryFieldModal.setAttribute('class','modal')
    categoryFieldModal.setAttribute('id','myModal')
    const categoryFieldModalContent = document.createElement('div')
    categoryFieldModalContent.setAttribute('class','modal-content')
    const categoryFieldModalClose = document.createElement('span')
    categoryFieldModalClose.setAttribute('class','close')
    categoryFieldModalClose.innerHTML = '&times;'
    categoryFieldModalClose.onclick = function () {closeCategoryModal()}


    const categoryFieldContent = document.createElement('div')
    categoryFieldContent.setAttribute('class','category-input-container')
    const categoryInputField = document.createElement('input')
    categoryInputField.setAttribute('id','category-name')

    const categorySubmit = document.createElement('button')
    categorySubmit.setAttribute('id','category-submit')
    categorySubmit.innerHTML = 'Add Category'
    categorySubmit.onclick = function() {addNewCategory()}

    categoryFieldContent.append(categoryInputField,categorySubmit)
    categoryFieldModalContent.append(categoryFieldModalClose,categoryFieldContent,categorySubmit)
    categoryFieldModal.append(categoryFieldModalContent)

    /*New Task Modal*/
    const addNewTaskModal = document.createElement('div')
    addNewTaskModal.setAttribute('class','modal')
    addNewTaskModal.setAttribute('id','newTaskModal')
    const addNewTaskModalContent = document.createElement('div')
    addNewTaskModalContent.setAttribute('class','modal-content')
    const addNewTaskModalClose = document.createElement('span')
    addNewTaskModalClose.setAttribute('class','close')
    addNewTaskModalClose.innerHTML = '&times;'
    addNewTaskModalClose.onclick = function () {closeTaskModal()}


    const addNewTaskContent = document.createElement('div')
    addNewTaskContent.setAttribute('class','task-input-container')
    const taskCategoryDropdown = document.createElement('select')
    taskCategoryDropdown.setAttribute('id','task-category-dropdown')
    var option = document.createElement("option");
    option.value = '';
    option.text = '';
    taskCategoryDropdown.appendChild(option)
    const addNewTaskInput = document.createElement('input')
    addNewTaskInput.setAttribute('id','task-name')

    const addNewTaskDate = document.createElement('input')
    addNewTaskDate.setAttribute('id','task-date')
    addNewTaskDate.setAttribute('type','date')

    const addNewTaskSubmit = document.createElement('button')
    addNewTaskSubmit.setAttribute('id','task-submit')
    addNewTaskSubmit.innerHTML = 'Add Task'
    addNewTaskSubmit.onclick = function() {addNewTask()}

    addNewTaskContent.append(taskCategoryDropdown,addNewTaskInput,addNewTaskDate,addNewTaskSubmit)
    addNewTaskModalContent.append(addNewTaskModalClose,addNewTaskContent,addNewTaskSubmit)
    addNewTaskModal.append(addNewTaskModalContent)

    taskCategoryList.append(taskCategoryListUL,showCategoryModalButton)
    mainContainerBody.append(taskCategoryList,taskContainer)
    element.append(mainContainerHeader,mainContainerBody,categoryFieldModal,addNewTaskModal)
    /*element.innerHTML = `
    <div class="main-container-header">To Do List</div>
    <div class="main-container-body">
        <div class="task-category-list" id="task-category-list">
            <ul>
                <li class="task-category-item task-category-active" onclick="function() {selectCategory()}"><span>All Tasks</span><span class="notification-circle">2</span></li>
                <li class="task-category-item" onclick="selectCategory()">Today's Task </li>
                <li class="task-category-item">Categorized Tasks</li>
                <ul>
                    <li class="task-category-item"><span>Gym</span><span class="notification-circle">2</span></li>
                    <li class="task-category-item">Study</li>
                    <li class="task-category-item">Work</li>
                <ul>
            </ul>
        </div>
        <div class="tasks-container" id="task-container">
            <div class="task-item task-priority-orange">
                <div>
                <input type='checkbox' class='task-checkbox'/>
                <span>Task 1</span>
                </div>
                <div>
                <button class='task-button task-button-details' onclick="selectCategory()">Details</button>
                <span>Apr 10</span>
                <button class='task-button task-button-edit'>Edit</button>
                <button class='task-button task-button-delete'>Delete</button>
                </div>
            </div>
            <div class="task-item task-priority-red">Task 2</div>
            <div class="task-item task-priority-green">Task 3</div>
        </div>
    </div>
`*/

document.body.appendChild(element);

}

//document.body.appendChild(component());
export default class UI {
    static loadPage() {
        loadComponent()
        UI.loadCategories()
        UI.loadTasks('')
    }
    
    static loadCategories(){
        const taskCategoryDropdownElement = document.getElementById('task-category-dropdown')
        Storage.getTodoList()
            .getCategories()
            .forEach((category) => {
                if (
                category.name !== 'All' &&
                category.name !== 'Today' 
                ) {
                UI.createCategory(category.name)
                var option = document.createElement("option");
                    option.value = category.name;
                    option.text = category.name;
                    taskCategoryDropdownElement.appendChild(option)
                }
            })
    //UI.initAddProjectButtons()
    }

    static loadTasks(loadCategory){
        const existingTaskItem = Array.from(document.getElementsByClassName('task-item'))
        if(existingTaskItem)
        {
            existingTaskItem.forEach(taskItem => {
                taskItem.remove();
              });
        }
        if(loadCategory === '' || loadCategory === 'All') {
        Storage.getTodoList()
            .getCategories().map((category) => category.getTasks()
            .forEach((task) => UI.createTask(task.id,task.name,task.dueDate,task.isDone,category.name)))
        }
        else if(loadCategory === 'Today') {
            Storage.getTodoList()
            .getCategories().map((category) => category.getTasksToday()
            .forEach((task) => UI.createTask(task.id,task.name,task.dueDate,task.isDone,category.name)))
        }
        else{
        Storage.getTodoList()
            .getCategory(loadCategory)
            .getTasks()
            .forEach((task) => UI.createTask(task.id,task.name,task.dueDate,task.isDone,loadCategory))
        }
    }


    static createCategory(category) {
        const categoryList = document.getElementById('task-category-list-ul')
        const categorizedTask = document.createElement('li')
        categorizedTask.setAttribute('class','task-category-item')
        categorizedTask.innerHTML = `<span>${category}</span>`
        categorizedTask.onclick = function() {selectCategory(categorizedTask,category)}
        //categoryList.innerHTML += categorizedTask
        categoryList.appendChild(categorizedTask)
        //UI.initProjectButtons()
    }

    static createTask(id,taskName,dueDate,isDone,category) {
        
        const taskItem = document.createElement('div')
        const taskItemLeft = document.createElement('div')
        const taskItemDetails  = document.createElement('span')
        const taskItemCheckBox  = document.createElement('input')
        const taskItemRight = document.createElement('div')
        const taskItemDetailsButton = document.createElement('button')
        const taskItemDate = document.createElement('span')
        const taskItemEditButton = document.createElement('button')
        const taskItemDeleteButton = document.createElement('button')

        taskItem.setAttribute('class','task-item')
        taskItem.setAttribute('id',`task-id-${id}`)
        taskItemCheckBox.setAttribute('type','checkbox')
        taskItemCheckBox.setAttribute('class','task-checkbox')
        taskItemCheckBox.value = isDone
        taskItemDetails.innerHTML = taskName

        taskItemDetailsButton.setAttribute('class','task-button task-button-details')
        taskItemEditButton.setAttribute('class','task-button task-button-edit')
        taskItemDeleteButton.setAttribute('class','task-button task-button-delete')
        taskItemDetailsButton.innerHTML = 'Details'
        taskItemDate.innerHTML = dueDate
        taskItemEditButton.innerHTML = 'Edit'
        taskItemDeleteButton.innerHTML = 'Delete'

    
        taskItemDetailsButton.onclick = function() {detailsFunction(id)}
        taskItemEditButton.onclick = function() {editFunction(id)}
        taskItemDeleteButton.onclick = function() {deleteFunction(category,id)}


        taskItemLeft.append(taskItemCheckBox,taskItemDetails)
        taskItemRight.append(taskItemDetailsButton,taskItemDate,taskItemEditButton,taskItemDeleteButton)
        taskItem.append(taskItemLeft,taskItemRight)

        const taskContainer = document.getElementById('task-container')
        taskContainer.appendChild(taskItem)
    }
}

document.addEventListener('DOMContentLoaded',UI.loadPage())
