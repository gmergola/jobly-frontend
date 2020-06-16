import React from 'react';

/**Alert: shows errors when they occur in forms */
function Alert({ errors }) {

  return (
    errors.map((err, i) => {
      if (err === "Invalid Credentials") return <div>{err}</div>
      return <div key={i}><b>{err.slice(9)}</b></div>
    })
  );
}

export default Alert;