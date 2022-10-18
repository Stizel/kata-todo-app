import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()

    this.state = {
      label: '',
    }

    this.onLabelChange = (e) => {
      this.setState({ label: e.target.value })
    }

    this.onSubmit = (evt) => {
      evt.preventDefault()
      const { onItemAdded } = this.props
      const { label } = this.state
      if (label) onItemAdded(label)
      this.setState({ label: '' })
    }
  }

  render() {
    const { label } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
        </form>
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
