import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

export default function App() {
  const createTodoItem = (description, timer) => ({
    label: description,
    created: Date.now(),
    edit: false,
    done: false,
    id: uuidv4(),
    timer,
  })

  const [tasks, setTasks] = useState([
    createTodoItem('Completed task', 655),
    createTodoItem('Editing task', 1000),
    createTodoItem('Active task', 65),
  ])

  const [filter, setFilter] = useState('all')

  const deleteItem = (id) => {
    setTasks(() => {
      const idx = tasks.findIndex((el) => el.id === id)
      return [...tasks.slice(0, idx), ...tasks.slice(idx + 1)]
    })
  }

  const getTime = (min, sec) => {
    const m = +min
    const s = +sec
    return m * 60 + s
  }

  const addItem = (text, min, sec) => {
    const timer = getTime(min, sec)
    const newItem = createTodoItem(text, timer)
    setTasks(() => [...tasks, newItem])
  }

  const toggleProperty = (arr, id, propName) => {
    // find el
    const idx = arr.findIndex((el) => el.id === id)
    // update obj
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    // construct new arr
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const editItem = (id, text) => {
    const [item] = tasks.filter((el) => el.id === id)
    const newItem = { ...item, label: text, edit: false }
    setTasks(() => {
      const newTasks = [...tasks]
      const idx = newTasks.findIndex((el) => el.id === id)
      return [...newTasks.slice(0, idx), newItem, ...newTasks.slice(idx + 1)]
    })
  }

  const onToggleEdit = (id) => {
    setTasks(() => toggleProperty(tasks, id, 'edit'))
  }

  const onToggleDone = (id) => {
    setTasks(() => toggleProperty(tasks, id, 'done'))
  }

  const filt = (items, filterName) => {
    switch (filterName) {
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

  const onFilterChange = (filtName) => {
    setFilter(filtName)
  }

  const tick = (id) => {
    setTasks((todos) => {
      const [item] = todos.filter((el) => el.id === id)
      const { timer } = item
      const newItem = { ...item, timer: timer - 1 }
      const newTasks = [...todos]
      const idx = newTasks.findIndex((el) => el.id === id)
      return [...newTasks.slice(0, idx), newItem, ...newTasks.slice(idx + 1)]
    })
  }

  const visibleItems = filt(tasks, filter)
  const todoCount = tasks.filter((el) => !el.done).length
  const doneTasks = tasks.filter((el) => el.done)

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          visible={visibleItems}
          tasks={tasks}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editItem={editItem}
          tick={tick}
        />
        <Footer
          filter={filter}
          onFilterChange={onFilterChange}
          todoLeft={todoCount}
          doneTasks={doneTasks}
          deleteItem={deleteItem}
        />
      </section>
    </section>
  )
}
