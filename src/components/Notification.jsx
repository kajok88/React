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
  const success = {
    color: 'green',
    background: 'lightgrey',
    font_size: 20,
    border_style: 'solid',
    border_radius: 5,
    padding: 10,
    margin_bottom: 10,
  }
  const info = {
    color: 'blue',
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
    else if (message.includes('successfully deleted')){
      return (
        <div style={error} className="error">
          {message}
        </div>
      )
    }
    else if (message.includes('added') || message.includes('updated')){
      return (
        <div style={success} className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div style={info} className="error">
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