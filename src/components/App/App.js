import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

export default class App extends Component {
  state = {
    tasks: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label: label,
      created: Date.now(),
      edit: false,
      done: false,
      id: uuidv4(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id)
      return {
        tasks: [...tasks.slice(0, idx), ...tasks.slice(idx + 1)],
      }
    })
  }
  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
    }))
  }

  editItem = (id, text) => {
    const { tasks } = this.state
    const [item] = tasks.filter((el) => el.id === id)
    const newItem = { ...item, label: text, edit: false }
    this.setState(({ tasks: newTasks }) => {
      const idx = newTasks.findIndex((el) => el.id === id)
      return { tasks: [...newTasks.slice(0, idx), newItem, ...newTasks.slice(idx + 1)] }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'edit'),
    }))
  }

  toggleProperty(arr, id, propName) {
    //find el
    const idx = arr.findIndex((el) => el.id === id)
    //update obj
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    //construct new arr
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'done'),
    }))
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { tasks, filter } = this.state
    const visibleItems = this.filter(tasks, filter)
    const todoCount = tasks.filter((el) => !el.done).length
    const doneTasks = tasks.filter((el) => el.done)

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            editItem={this.editItem}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            todoLeft={todoCount}
            doneTasks={doneTasks}
            deleteItem={this.deleteItem}
          />
        </section>
      </section>
    )
  }
}
