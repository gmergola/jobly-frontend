import React from 'react';
import { Link } from "react-router-dom";
import "./CompanyCard.css"
/**CompanyCard: Child component to CompanyList
 * renders information about company
 */

function CompanyCard({ name, description, handle }) {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
        <p className="card-text">{description}</p>
      </div>
      <Link className="card-link" to={`/companies/${handle}`}>See details for <b>{name}</b></Link>
    </div>
  );
}

export default CompanyCard;