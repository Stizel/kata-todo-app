import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

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
    const { id, edit, done, created, onDeleted, onToggleDone, onToggleEdit } = this.props
    const { newLabel } = this.state
    let clazz = null
    if (edit) clazz = 'editing'

    if (done) clazz = 'completed'
    const htmlLabel = id
    return (
      <li className={clazz}>
        <div className="view">
          <input id={htmlLabel} className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label htmlFor={htmlLabel}>
            <span className="description">{newLabel}</span>
            <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={() => onToggleEdit(id)} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} aria-label="delete" />
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
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  created: PropTypes.number,
  editItem: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
}
