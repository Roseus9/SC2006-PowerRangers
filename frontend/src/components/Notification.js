import React from 'react'
import Alert from 'react-bootstrap/Alert';

function Notification({variant, message}) {
  return (
    <Alert variant={variant}>
        {message}
    </Alert>
  )
}

export default Notification