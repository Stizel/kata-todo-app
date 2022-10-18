import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props
    const buttons = this.buttons.map(({ name, label }) => (
      <li key={name}>
        <button type="button" className={filter === name ? 'selected' : null} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    ))
    return <ul className="filters">{buttons}</ul>
  }
}
TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'done']),
  onFilterChange: PropTypes.func,
}
