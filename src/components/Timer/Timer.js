import React, { useEffect, useState } from 'react'
import './Timer.css'
import PropTypes from 'prop-types'

export default function Timer({ tick, timer }) {
  const [play, setPlay] = useState(false)

  const printTime = (time) => {
    if (time < 1) return '00:00'
    let min = Math.floor(time / 60)
    let sec = time - 60 * min
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return `${min}:${sec}`
  }

  const startTimer = () => {
    setPlay(true)
  }
  const pauseTimer = () => {
    setPlay(false)
  }

  useEffect(() => {
    const tik = setInterval(() => {
      if (play) {
        tick()
      }
    }, 1000)
    if (timer === 0) clearInterval(tik)
    return () => clearInterval(tik)
  }, [play, timer])

  let cls = !play ? 'icon icon-play' : 'icon icon-pause'
  if (timer === 0) {
    cls = null
  }
  const timerClickHandler = !play ? startTimer : pauseTimer

  return (
    <span className="description">
      <button type="button" className={cls} aria-label="play" onClick={timerClickHandler} />
      {printTime(timer)}
    </span>
  )
}

Timer.defaultProps = {
  tick: () => {},
}
Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  tick: PropTypes.func,
}
