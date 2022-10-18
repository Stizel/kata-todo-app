import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

export default function TaskList({ tasks, onDeleted, onToggleDone, onToggleEdit, editItem }) {
  const taskz = tasks.map((task) => {
    const { id } = task
    return (
      <Task
        key={id}
        {...task}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={onToggleEdit}
        editItem={editItem}
      />
    )
  })

  return <ul className="todo-list">{taskz}</ul>
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  editItem: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editItem: PropTypes.func,
}
