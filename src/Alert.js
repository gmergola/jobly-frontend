import React from 'react';

/**Alert: shows errors when they occur in forms */
function Alert({errors}){

  return (
    errors.map((err,i) => (
      <div key={i}><b>{err}</b></div>
    ))

  );
}

export default Alert;