import React from 'react'
import PropTypes from 'prop-types'

import './TasksFilter.css'

export default function TasksFilter({ filter, onFilterChange }) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  const buttonz = buttons.map(({ name, label }) => (
    <li key={name}>
      <button type="button" className={filter === name ? 'selected' : null} onClick={() => onFilterChange(name)}>
        {label}
      </button>
    </li>
  ))
  return <ul className="filters">{buttonz}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'done']),
  onFilterChange: PropTypes.func,
}
