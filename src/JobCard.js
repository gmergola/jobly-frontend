import React from 'react';
import './JobCard.css';

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ title, salary, equity }) {
  return (
    <div className="JobCard-card card border-warning mb-3" >
      <div>
        <br />
        <h2 className="card-header"><b>Title</b>: {title}</h2>
        <div className="card-body text-warning">
          <h4 className="card-text"><b>Salary</b>: {salary}</h4>
          <h4 className="card-text"><b>Equity</b>: {equity}</h4>
        </div>
      </div>
    </div>
  );

}

export default JobCard