import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes, { objectOf } from 'prop-types'

import './Task.css'
import Timer from '../Timer/Timer'

export default function Task({
  label,
  editItem,
  id,
  visible,
  edit,
  done,
  created,
  onDeleted,
  onToggleDone,
  onToggleEdit,
  timer,
  tick,
}) {
  const [oldLabel, setOldLabel] = useState(label)
  const [newLabel, setNewLabel] = useState(label)

  const onLabelChange = (e) => {
    setNewLabel(e.target.value)
  }

  const cancelChanges = () => {
    editItem(id, label)
    setNewLabel(oldLabel)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      editItem(id, newLabel)
      setOldLabel(newLabel)
    } else if (e.key === 'Escape') {
      cancelChanges()
    }
  }

  const blur = () => {
    cancelChanges()
  }

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
          <span className="title">{oldLabel}</span>
          <Timer timer={timer} tick={() => tick(id)} />

          <span className="description">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onToggleEdit(id)} aria-label="edit" />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleted(id)} aria-label="delete" />
      </div>
      {edit ? (
        <input
          autoFocus
          type="text"
          onKeyDown={onKeyDown}
          onBlur={blur}
          className="edit"
          value={newLabel}
          onChange={onLabelChange}
        />
      ) : null}
    </li>
  )
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
