import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

export default function TaskList({ tasks, visible, onDeleted, onToggleDone, onToggleEdit, editItem, tick }) {
  const taskz = tasks.map((task) => {
    const { id } = task
    return (
      <Task
        key={id}
        {...task}
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
        onToggleEdit={onToggleEdit}
        editItem={editItem}
        tick={tick}
        visible={visible}
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
