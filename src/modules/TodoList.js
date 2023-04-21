import { compareAsc, toDate } from 'date-fns'
import Category from './Category'
import Task from './Task'

export default class TodoList {
  constructor() {
    this.category = []
    this.category.push(new Category('All'))
    this.category.push(new Category('Today'))
    this.category.push(new Category('Uncategorized'))
    this.category.push(new Category('Gym'))
    this.category.push(new Category('Educational'))
    this.category.push(new Category('Message'))
  }

  setCategory(category) {
    this.category = category
  }

  getCategories() {
    return this.category
  }

  getCategory(categoryName) {
    return this.category.find((category) => category.getName() === categoryName)
  }

  addCategory(newCategory) {
    if (this.category.find((category) => category.name === newCategory.name))
      return
    this.category.push(newCategory)

  }
}
