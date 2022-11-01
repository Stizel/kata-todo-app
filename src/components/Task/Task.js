import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes, { objectOf } from 'prop-types'

import './Task.css'
import Timer from '../Timer/Timer'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { label } = this.props
    this.state = {
      newLabel: label,
    }

    this.onLabelChange = (e) => {
      this.setState({ newLabel: e.target.value })
    }

    this.onSubmit = (evt) => {
      evt.preventDefault()
      const { editItem, id } = this.props
      const { newLabel } = this.state
      editItem(id, newLabel)
      this.setState({ newLabel })
    }
  }

  render() {
    const { id, visible, edit, done, created, onDeleted, onToggleDone, onToggleEdit, timer, tick } = this.props
    const { newLabel } = this.state
    let clazz = ''
    if (done) clazz = 'completed'
    if (edit) clazz = 'editing'
    if (!visible.some((el) => el.id === id)) clazz = 'hidden'

    const htmlLabel = id
    return (
      <li className={clazz}>
        <div className="view">
          <input id={htmlLabel} className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={done} />
          <label htmlFor={htmlLabel}>
            <span className="title">{newLabel}</span>
            <Timer timer={timer} tick={() => tick(id)} />

            <span className="description">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onToggleEdit(id)} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)} aria-label="delete" />
        </div>
        {edit ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={newLabel} onChange={this.onLabelChange} />
          </form>
        ) : null}
      </li>
    )
  }
}

Task.defaultProps = {
  created: Date.now(),
  editItem: () => {},
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
}
Task.propTypes = {
  id: PropTypes.string.isRequired,
  visible: PropTypes.arrayOf(objectOf).isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  created: PropTypes.number,
  editItem: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
}
