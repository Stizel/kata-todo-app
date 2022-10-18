import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

import './Footer.css'

function Footer({ filter, todoLeft, onFilterChange, doneTasks, deleteItem }) {
  const deleteDoneTasks = () => {
    doneTasks.forEach((task) => {
      deleteItem(task.id)
    })
  }

  return (
    <footer className="footer">
      <span className="todo-count">{todoLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={() => deleteDoneTasks()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  filter: 'all',
  todoLeft: 0,
  doneTasks: [],
  onFilterChange: () => {},
}

Footer.propTypes = {
  filter: PropTypes.string,
  todoLeft: PropTypes.number,
  doneTasks: PropTypes.arrayOf(PropTypes.objectOf),
  onFilterChange: PropTypes.func,
  deleteItem: PropTypes.func.isRequired,
}

export default Footer
