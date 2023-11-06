import React from 'react'

const error = {
    color: 'red',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10,
  }


const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div style={error} className="error">
        {message}
      </div>
    )
  }

export default Notification