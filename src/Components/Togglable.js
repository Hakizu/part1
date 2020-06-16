import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibiliity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibiliity
    }
  })

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={toggleVisibiliity}>{props.buttonLabel} </button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibiliity}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable