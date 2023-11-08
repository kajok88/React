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
  const notification = {
    color: 'green',
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
    else if (message.includes('deleted')){
      return (
        <div style={error} className="error">
          {message}
        </div>
      )
    }
    else if (message.includes('added') || message.includes('updated')){
      return (
        <div style={notification} className="error">
          {message}
        </div>
      )
    }
  
    // return (
    //   <div style={error} className="error">
    //     {message}
    //   </div>
    // )
  }

export default Notification