import React, { useState } from 'react';
import './JobCard.css';

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ title, salary, equity }) {
  const [applied, setApplied] = useState(false);
  return (
    <div className="JobCard-card card border-warning mb-3" >
      <div>
        <br />
        <h2 className="JobCard-title card-header"><b>Title</b>: {title}</h2>
        <div className="card-body text-warning">
          <h4 className="card-text"><b>Salary</b>: {salary}</h4>
          <h4 className="card-text"><b>Equity</b>: {equity}</h4>
        </div>
      </div>
      <button onClick={() => setApplied(true)} className={`JobCard-apply-btn btn btn-danger ${applied ? " disabled" : ""}`}>{applied ? 'APPLIED' : 'APPLY'}</button>
    </div>
  );

}

export default JobCard