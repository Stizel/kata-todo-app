import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './NewTaskForm.css'

export default function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinChange = (e) => {
    if (+e.target.value < 1) {
      setMin('00')
    } else if (+e.target.value > 59) {
      setMin('60')
      setSec('00')
    } else setMin(e.target.value)
  }

  const onSecChange = (e) => {
    if (+e.target.value < 1) {
      setSec('00')
    } else if (min > 59) {
      setMin('00')
    } else if (e.target.value > 59) {
      setMin(+min + 1)
      setSec('00')
    } else setSec(e.target.value)
  }

  const setAllToNull = () => {
    setLabel('')
    setMin('')
    setSec('')
  }

  const labelSubmitHandler = (e) => {
    if (e.key === 'Enter') {
      if (label) {
        onItemAdded(label, min, sec)
        setAllToNull()
      }
    } else if (e.key === 'Escape') {
      setAllToNull()
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onLabelChange}
          value={label}
          onKeyDown={labelSubmitHandler}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={onMinChange}
          onKeyDown={labelSubmitHandler}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={onSecChange}
          onKeyDown={labelSubmitHandler}
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}
