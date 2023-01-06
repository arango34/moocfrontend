import React from 'react';

const Alert = ({ color, msg }) => {
  return (
    <div
      style={{
        color,
        backgroundColor: 'lightgrey',
        padding: '10px',
        border: 'solid',
        borderRadius: '5px',
        marginBottom: '10px',
      }}
    >
      {msg}
    </div>
  );
};

export default Alert;
