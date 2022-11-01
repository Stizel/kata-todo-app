import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()

    this.state = {
      label: '',
      min: '',
      sec: '',
    }

    this.onLabelChange = (e) => {
      this.setState({ label: e.target.value })
    }
    this.onMinChange = (e) => {
      if (+e.target.value < 1) {
        this.setState({ min: '00' })
      } else if (+e.target.value > 59) {
        this.setState({ min: '60', sec: '00' })
      } else this.setState({ min: e.target.value })
    }
    this.onSecChange = (e) => {
      const { min } = this.state
      if (+e.target.value < 1) {
        this.setState({ sec: '00' })
      } else if (min > 59) {
        this.setState({ sec: '00' })
      } else if (e.target.value > 59) {
        this.setState({ min: +min + 1, sec: '00' })
      } else this.setState({ sec: e.target.value })
    }

    this.labelSubmitHandler = (e) => {
      if (e.key === 'Enter') {
        const { onItemAdded } = this.props
        const { label, min, sec } = this.state
        if (label) onItemAdded(label, min, sec)
        this.setState({ label: '', min: '', sec: '' })
      } else if (e.key === 'Escape') {
        this.setState({ label: '', min: '', sec: '' })
      }
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
            onKeyDown={this.labelSubmitHandler}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            value={min}
            onChange={this.onMinChange}
            onKeyDown={this.labelSubmitHandler}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={sec}
            onChange={this.onSecChange}
            onKeyDown={this.labelSubmitHandler}
          />
        </form>
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
