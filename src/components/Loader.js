import Spinner from 'react-bootstrap/Spinner';

import React from 'react'

function Loader() {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Spinner animation="grow" role="status"
            style = {{
                width: '8vw',
                height: '8vw',
        }}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>

  )
}

export default Loader