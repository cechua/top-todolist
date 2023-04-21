export default class Task {
    constructor(id,name, dueDate = 'No date',isDone = false) {
      this.id = id
      this.name = name
      this.dueDate = dueDate
      this.isDone = isDone
    }
  
    setId() {
        this.id = id
    }

    getId() {
        return this.id
    }

    setName(name) {
      this.name = name
    }
  
    getName() {
      return this.name
    }
  
    setDate(dueDate) {
      this.dueDate = dueDate
    }
  
    getDate() {
      return this.dueDate
    }

    setisDone(isDone) {
        this.isDone = isDone
    }

    getisDone() {
        return this.isDone
    }

    getDateFormatted() {
      const day = this.dueDate.split('-')[2]
      const month = this.dueDate.split('-')[1]
      const year = this.dueDate.split('-')[0]
      return `${month}/${day}/${year}`
    }
  }
  