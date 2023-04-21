import Category from './Category'
import Task from './Task'
import TodoList from './TodoList'

export default class Storage {
  static saveTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data))
  }

  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem('todoList'))
    )
    todoList.setCategory(
      todoList
        .getCategories()
        .map((category) => Object.assign(new Category(), category))
    )
    
    todoList
      .getCategories()
      .forEach((category) =>
        category.setTasks(
          category.getTasks().map((task) => Object.assign(new Task(), task))
        )
      )

    return todoList
  }

  static addCategory(category) {
    const todoList = Storage.getTodoList()
    todoList.addCategory(category)
    Storage.saveTodoList(todoList)
  }

  static addTask(categoryName, task) {
    const todoList = Storage.getTodoList()
    todoList.getCategory(categoryName).addTask(task)
    Storage.saveTodoList(todoList)
  }

  static deleteTask(categoryName, taskId) {
    const todoList = Storage.getTodoList()
    todoList.getCategory(categoryName).deleteTask(taskId)
    Storage.saveTodoList(todoList)
  }
}
