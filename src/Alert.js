import React from 'react';

/**Alert: shows messages*/
function Alert({ message, type }) {

  return (
    message.map((m, i) => <div key={i} className={`alert alert-${type}`}>{m}</div>)
  );
}

export default Alert;